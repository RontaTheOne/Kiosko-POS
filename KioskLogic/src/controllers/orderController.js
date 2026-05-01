import pool from "../config/db.js";

//Crear una orden
export const createOrder = async (req, res) => {
    const { tipo_orden, productos } = req.body;
    // Validación de si hay productos en la orden
    if (!productos || productos.length === 0) {
        return res.status(400).json({ error: "No hay productos en la orden" });
    }

    const client = await pool.connect();

    try {
        // Ingresar orden
        await client.query("BEGIN");

        const ordenResult = await client.query(
        `INSERT INTO orden (tipo_orden, total, estado)
        VALUES ($1::tipo_orden_enum, 0, 'pendiente'::estado_orden_enum)
        RETURNING id_orden`,
        [tipo_orden],
        );

        const id_orden = ordenResult.rows[0].id_orden;

        let total = 0;
        // Procesar cada producto de la orden
        for (const item of productos) {
        const { id_producto, cantidad } = item;

        // Validar producto
        const productoDB = await client.query(
            `SELECT precio_base FROM producto WHERE id_producto = $1`,
            [id_producto],
        );

        if (productoDB.rows.length === 0) {
            throw new Error(`Producto ${id_producto} no existe`);
        }

        // Calcular IVA, subtotal y total
        const precio = Number(productoDB.rows[0].precio_base);
        const subtotal = precio * cantidad;
        const iva = subtotal * 0.19;
        total += subtotal + iva;

        // Validaciones de precios, totales y cantidades
        if (!precio || isNaN(precio)) {
            throw new Error(
            `Precio no es un número válido para producto ${id_producto}`,
            );
        }

        if (isNaN(total)) {
            throw new Error(
            `Total no es un número válido para producto ${id_producto}`,
            );
        }

        if (total < 0) {
            throw new Error(
            `Total no puede ser negativo para producto ${id_producto}`,
            );
        }

        // Insertar detalle de orden
        await client.query(
            `INSERT INTO detalle_orden 
            (id_orden, id_producto, cantidad, precio_unitario, subtotal)
            VALUES ($1, $2, $3, $4, $5)`,
            [id_orden, id_producto, cantidad, precio, subtotal],
        );
        }

        // Redondeo correcto a 2 decimales
        total = Number(total.toFixed(2));

        await client.query(`UPDATE orden SET total = $1 WHERE id_orden = $2`, [
        total,
        id_orden,
        ]);

        await client.query("COMMIT");

        res.status(201).json({
        message: "Orden creada",
        id_orden,
        total,
        });
    }catch (error) {
        await client.query("ROLLBACK");
        console.error("ERROR POSTGRES:", error.message);

        res.status(500).json({
        error: "Error al crear la orden",
        detalle: error.message,
    });
    } finally {
        client.release();
    }
};

// Obtener orden con sus detalles
export const getOrderById = async (req, res) => {
  const { id } = req.params;

  // Validación básica
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    // 🧾 Obtener orden
    const ordenResult = await pool.query(
      `SELECT id_orden, tipo_orden, total, estado, fecha
       FROM orden
       WHERE id_orden = $1`,
      [id],
    );

    if (ordenResult.rows.length === 0) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    // 📦 Obtener detalle con JOIN (PostgreSQL style)
    const detalleResult = await pool.query(
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
      [id],
    );

    res.json({
      ...ordenResult.rows[0],
      detalles: detalleResult.rows,
    });
  } catch (error) {
    console.error("ERROR GET ORDER:", error.message);

    res.status(500).json({
      error: "Error al obtener la orden",
      detalle: error.message,
    });
  }
};

// Cambiar el estado de una orden
export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  const estadosValidos = ["pendiente", "en_pago", "pagada", "cancelada"];

    if (!id || isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    if (!estadosValidos.includes(estado)) {
        return res.status(400).json({ error: "Estado inválido" });
    }

    try {
        // 🔍 Obtener estado actual
        const result = await pool.query(
        `SELECT estado FROM orden WHERE id_orden = $1`,
        [id],
        );

        if (result.rows.length === 0) {
        return res.status(404).json({ error: "Orden no encontrada" });
        }

        const estadoActual = result.rows[0].estado;

        //Validar flujo lógico (muy importante)
        const transicionesValidas = {
        pendiente: ["en_pago", "cancelada"],
        en_pago: ["pagada", "cancelada"],
        pagada: [],
        cancelada: [],
        };

        if (!transicionesValidas[estadoActual].includes(estado)) {
        return res.status(400).json({
            error: `No se puede cambiar de ${estadoActual} a ${estado}`,
        });
        }

        // 🔥 Update con ENUM en PostgreSQL
        await pool.query(
        `UPDATE orden 
        SET estado = $1::estado_orden_enum
        WHERE id_orden = $2`,
        [estado, id],
        );

        res.json({
        message: "Estado actualizado correctamente",
        estado_anterior: estadoActual,
        nuevo_estado: estado,
        });
    } catch (error) {
        console.error("ERROR UPDATE STATUS:", error.message);

        res.status(500).json({
        error: "Error al actualizar estado",
        detalle: error.message,
        });
    }
};
