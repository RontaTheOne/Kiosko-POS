import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
});