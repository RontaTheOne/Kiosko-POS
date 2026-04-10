import { Router } from "express";
import { getProducts, getProductById} from "../controllers/productcontroller.js";

const router = Router();
//Ver todos los productos
router.get('/', getProducts);
//ver un producto
router.get('/:id', getProductById);

export default router;