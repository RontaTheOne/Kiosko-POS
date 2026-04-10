import express from "express";
import productRoutes from "./routes/productroutes.js";
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
app.use('/producto', productRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).send(`
    <h1>ERROR 404</h1>
    <p>Ruta no encontrada</p>
  `);
});

export default app;
  