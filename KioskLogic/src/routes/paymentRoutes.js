import { Router } from "express";
import {processPayment,confirmCashPayment} from "../controllers/paymentController.js";

const router = Router();
// Crear pago
router.post("/:id_orden", processPayment);
// Confirmar efectivo
router.post("/efectivo/:id_pago", confirmCashPayment);

export default router;