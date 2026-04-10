import pool from '../config/db.js';

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try { 
    const result = await pool.query('SELECT * FROM producto');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Obtener un producto seleccionado por su ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el producto:', err);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};