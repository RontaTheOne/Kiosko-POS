import pool from "../config/db.js";

// Crear pago
export const processPayment = async (req, res) => {

  try {

    const { id_orden } = req.params;

    const {
      id_metodo_pago,
      monto
    } = req.body;

    console.log("BODY:", req.body);

    // Buscar método
    const metodoResult = await pool.query(
      `SELECT nombre
       FROM metodo_pago
       WHERE id_metodo_pago = $1`,
      [id_metodo_pago]
    );

    if (metodoResult.rows.length === 0) {
      return res.status(404).json({
        error: "Método de pago no encontrado"
      });
    }

    const metodo = metodoResult.rows[0];

    // Crear pago
    const pagoResult = await pool.query(
      `INSERT INTO pago
      (id_orden, id_metodo_pago, monto, estado_pago, fecha)
      VALUES ($1, $2, $3, 'pendiente', NOW())
      RETURNING *`,
      [
        id_orden,
        id_metodo_pago,
        monto
      ]
    );
     
    console.log("PAGO RESULT:", pagoResult.rows[0]);

    // Actualizar orden
    await pool.query(
      `UPDATE orden
       SET estado = 'en_pago'
       WHERE id_orden = $1`,
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

// Confirmar pago efectivo
export const confirmCashPayment = async (req, res) => {

  try {

    const { id_pago } = req.params;

    const pagoResult = await pool.query(
      `UPDATE pago
       SET estado_pago = 'aprobado'
       WHERE id_pago = $1
       RETURNING *`,
      [id_pago]
    );

    if (pagoResult.rows.length === 0) {
      return res.status(404).json({
        error: "Pago no encontrado"
      });
    }

    const ordenId = pagoResult.rows[0].id_orden;

    await pool.query(
      `UPDATE orden
       SET estado = 'pagada'
       WHERE id_orden = $1`,
      [ordenId]
    );

    res.json({
      ok: true,
      pago: pagoResult.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error confirmando pago"
    });
  }
};