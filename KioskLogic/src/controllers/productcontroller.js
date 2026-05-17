import pool from '../config/db.js';

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try { 
    const result = await pool.query('SELECT * FROM producto');
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No hay productos' });
    }
    res.json(result.rows);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Obtener un producto seleccionado por su ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID invalido' });
  }
  try {
    const result = await pool.query('SELECT * FROM producto WHERE id_producto = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al obtener el producto:', err);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

export const getCategories = async (req, res) => {
  try {

    const result = await pool.query(`
      SELECT
        id_categoria,
        nombre
      FROM categorias
      ORDER BY nombre ASC
    `);

    res.json(result.rows);

  } catch (err) {

    console.error("Error:", err);

    res.status(500).json({
      error: "Error al obtener las categorias categorías"
    });

  }
};

// Mostrar los productos de una categoría específica
export const getProductsByCategory = async (req, res) => {

  const { category } = req.params;

  try {

    const result = await pool.query(
      `
      SELECT *
      FROM producto
      WHERE id_categoria = $1
      `,
      [category]
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Error al obtener productos"
    });

  }

};
