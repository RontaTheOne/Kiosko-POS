import pool from '../config/db.js';

//Crear una orden
export const createOrder = async (req, res) => {
    const { tipo_orden, productos } = req.body;

    // Validar que se hayan proporcionado los datos necesarios
    if (!tipo_orden || !productos || !Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ error: 'No hay productos para crear la orden' });
    }
    
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        // Insertar la orden
        const [orderResult] = await connection.query(
             `INSERT INTO orden (tipo_orden, total, estado)
                VALUES ($1::tipo_orden_enum, 0, 'pendiente'::estado_orden_enum)
                    RETURNING id_orden`,
            [tipo_orden]
        );
        const orderId = orderResult[0].id_orden;
        let total = 0;

        // Insertar los productos de la orden
        for (const item of productos) {
            const { id_producto, cantidad } = item;
            // Obtener el precio del producto para calcular el subtotal
            const [productResult] = await connection.query(
                `SELECT precio FROM producto WHERE id_producto = $1`,
                [id_producto]
            );

            if (productResult.length === 0) {
                throw new Error(`Producto con id ${id_producto} no encontrado`);
            }
            // Calcular el subtotal para este producto y acumular el total
            let subtotal = 0;
            const precio = productResult[0].precio;
            subtotal += precio * cantidad;
            total += subtotal;

            // Insertar el detalle de la orden
            await connection.query(
                `INSERT INTO detalle_orden 
                    (id_orden, id_producto, cantidad, precio_unitario, subtotal)
                VALUES ($1, $2, $3, $4, $5)`,
                [orderId, id_producto, cantidad, precio, subtotal]
            );
        }
        // Redondear a 2 decimales
        total = parseFloat(total.toFixed(2));

        // Actualizar el total de la orden
        await connection.query(
            `UPDATE orden SET total = $1 WHERE id_orden = $2`,
            [total, orderId]
        );

        // Confirmar la orden
        await connection.commit();
        res.status(201).json({ message: 'Orden creada exitosamente', id_orden: orderId });
    } catch (error) {
        await connection.rollback();
        console.error('Error al crear la orden:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        connection.release();
    }
}

// Obtener orden con sus detalles
export const getOrderById = async (req, res) => {
    const { id } = req.params;
    
    // Validar que el ID sea un número
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID de orden inválido' });
    }

    try {
        const connection = await pool.getConnection();
        // Obtener la orden
        const [orderResult] = await connection.query(
           `SELECT id_orden, tipo_orden, total, estado, fecha
                FROM orden
            WHERE id_orden = $1`,
            [id]
        );

        if (orderResult.length === 0) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        // Obtener los detalles de la orden
        const order = orderResult[0];
        // Obtener los detalles de la orden
        const [detailsResult] = await connection.query(
            `SELECT 
                d.id_detalle_orden,
                d.id_producto,
                p.nombre,
                d.cantidad,
                d.precio_unitario,
                d.subtotal
            FROM detalle_orden d
            INNER JOIN producto p 
                ON p.id_producto = d.id_producto
            WHERE d.id_orden = $1`,
            [id]
        );

        order.detalle = detailsResult;
        res.status(200).json(order);
    } catch (error) {
        console.error('Error al obtener la orden:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        connection.release();
    }
}

// Cambiar el estado de una orden
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    // Validar que el estado sea válido
    const validStates = ["pendiente", "en_pago", "pagada", "cancelada"];
    if (!validStates.includes(estado)) {
        return res.status(400).json({ error: 'Estado de orden inválido' });
    }

    // Validar que el ID sea un número    
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'ID de orden inválido' });
    }

    try {
        const connection = await pool.getConnection();
        // Verificar que la orden exista
        const [orderResult] = await connection.query(
             `SELECT estado FROM orden WHERE id_orden = $1`,
            [id]
        );

        if (orderResult.length === 0) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        const currentState = orderResult[0].estado;

        if (currentState === 'cancelada') {
            return res.status(400).json({ error: 'No se pueden cambiar el estado de una orden cancelada' });
        }   

        // Validar las transiciones de estado permitidas
        const validTransitions = {
            pendiente: ["en_pago", "cancelada"],
            en_pago: ["pagada", "cancelada"],
            pagada: [],
            cancelada: []
        };

        if (!validTransitions[currentState].includes(estado)) {
            return res.status(400).json({ error: 'Transición de estado no válida' });
        }

        // Actualizar el estado de la orden
        await connection.query(
            `UPDATE orden 
                SET estado = $1::estado_orden_enum
                WHERE id_orden = $2`,
            [estado, id]
        );

        res.status(200).json({ message: 'Estado de la orden actualizado exitosamente' });
    } catch (error) {
        console.error('Error al actualizar el estado de la orden:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        connection.release();
    }
}