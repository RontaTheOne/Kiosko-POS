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