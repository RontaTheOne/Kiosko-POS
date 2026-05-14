import { Router } from "express";
import {processPayment,getPaymentInfo} from "../controllers/paymentController.js";

const router = Router();

// crear pago
router.post("/:id_orden", processPayment);
// obtener info pago
router.get("/:id_pago", getPaymentInfo);

export default router;