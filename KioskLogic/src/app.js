import express from "express";

const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get("/", (req, res) => {
   res.send(`
    <h1>Servidor activo</h1>
    <p>KioskPOS ejecutandose con exito 🚀</p>
  `);
})

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).send(`
    <h1>ERROR 404</h1>
    <p>Ruta no encontrada</p>
  `);
});

export default app;
  