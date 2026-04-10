import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 3000;

// Verificar la conexión a la base de datos antes de iniciar el servidor
pool.connect()
  .then(() => {
    console.log('Conexión a la base de datos establecida'); 
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });
// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
});