import pool from "../config/db.js";

// Obtener métodos de pago
export const getMethods = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM metodo_pago");
        res.json(result.rows);
    } catch (error) {
        console.error("ERROR GET METHODS:", error.message);
        res.status(500).json({ error: "Error al obtener métodos de pago" });
    }
};