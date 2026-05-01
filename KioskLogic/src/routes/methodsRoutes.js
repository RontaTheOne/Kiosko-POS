import { Router } from "express";
import { getMethods } from "../controllers/methodsController.js";

const router = Router();

// Obtener métodos de pago
router.get("/", getMethods);

export default router;