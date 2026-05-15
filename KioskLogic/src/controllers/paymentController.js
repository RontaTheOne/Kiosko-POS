import pool from "../config/db.js";

// Crear nuevo pago
export const processPayment = async (req, res) => {

  try {

    const { id_orden } = req.params;

    const {
      id_metodo_pago,
      monto
    } = req.body;

    // método de pago
    const metodoResult = await pool.query(
      `
      SELECT *
      FROM metodo_pago
      WHERE id_metodo_pago = $1
      `,
      [id_metodo_pago]
    );

    if (metodoResult.rows.length === 0) {

      return res.status(404).json({
        error: "Método de pago no encontrado"
      });
    }

    const metodo = metodoResult.rows[0];

    // crear pago
    const pagoResult = await pool.query(
      `
      INSERT INTO pago (
        id_orden,
        id_metodo_pago,
        monto,
        estado_pago,
        fecha
      )
      VALUES (
        $1,
        $2,
        $3,
        'pendiente',
        NOW()
      )
      RETURNING *
      `,
      [
        id_orden,
        id_metodo_pago,
        monto
      ]
    );

    // actualizar orden
    await pool.query(
      `
      UPDATE orden
      SET estado = 'en_pago'
      WHERE id_orden = $1
      `,
      [id_orden]
    );

    res.json({

      nombre: metodo.nombre,

      pago: pagoResult.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error procesando pago"
    });
  }
};

// Información de pago
export const getPaymentInfo = async (req, res) => {

  try {

    const { id_pago } = req.params;

    const result = await pool.query(
      `
      SELECT

        p.id_pago,
        p.estado_pago,
        p.monto,

        o.id_orden,
        o.total,
        o.estado,
        o.fecha

      FROM pago p

      INNER JOIN orden o
      ON p.id_orden = o.id_orden

      WHERE p.id_pago = $1
      `,
      [id_pago]
    );

    if (result.rows.length === 0) {

      return res.status(404).json({
        error: "Pago no encontrado"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error obteniendo pago"
    });
  }
};

// Pago con tarjeta
export const processCardPayment = async (req, res) => {

  try {

    const { id_pago } = req.params;

    // simulación aprobación bancaria
    const approved =
      Math.random() > 0.15;

    // pago rechazado
    if (!approved) {

      await pool.query(
        `
        UPDATE pago
        SET estado_pago = 'rechazado'
        WHERE id_pago = $1
        `,
        [id_pago]
      );

      return res.status(400).json({
        success: false,
        estado: "rechazado",
        message: "Pago rechazado por el banco"
      });
    }

    // aprobar pago
    await pool.query(
      `
      UPDATE pago
      SET estado_pago = 'aprobado'
      WHERE id_pago = $1
      `,
      [id_pago]
    );

    // actualizar orden
    await pool.query(
      `
      UPDATE orden
      SET estado = 'pagada'
      WHERE id_orden = (
        SELECT id_orden
        FROM pago
        WHERE id_pago = $1
      )
      `,
      [id_pago]
    );

    res.json({
      success: true,
      estado: "aprobado",
      message: "Pago aprobado"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error procesando pago tarjeta"
    });
  }
};