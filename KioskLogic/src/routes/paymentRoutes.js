import { Router } from "express";
import {processPayment,getPaymentInfo, processCardPayment} from "../controllers/paymentController.js";

const router = Router();

// crear pago
router.post("/:id_orden", processPayment);
// obtener info pago
router.get("/:id_pago", getPaymentInfo);
//Pagar con tarjeta
router.put("/tarjeta/:id_pago", processCardPayment);
export default router;