import { Router } from "express";
import { getProducts, getProductById,getCategories, getProductsByCategory} from "../controllers/productcontroller.js";

const router = Router();
//Ver todos los productos
router.get('/', getProducts);
//ver categorias
router.get('/categoria', getCategories);
//ver productos por categoria
router.get('/categoria/:category', getProductsByCategory);
//ver un producto
router.get('/:id', getProductById);

export default router;