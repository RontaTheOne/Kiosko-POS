import express from "express";
import productRoutes from "./routes/productroutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import methodsRoutes from "./routes/methodsRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cors from "cors";

const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas
app.get("/", (req, res) => {
   res.send(`
    <h1>Servidor activo</h1>
    <p>KioskPOS ejecutandose con exito 🚀</p>
  `);
})
// Rutas de producto
app.use('/producto', productRoutes);
// Rutas de orden
app.use('/orden', orderRoutes);
// Rutas de métodos de pago
app.use('/metodo-pago', methodsRoutes);
// Rutas de pago
app.use('/pago', paymentRoutes);
// Ruta no encontrada
app.use((req, res) => {
  res.status(404).send(`
    <h1>ERROR 404</h1>
    <p>Ruta no encontrada</p>
  `);
});

export default app;
  