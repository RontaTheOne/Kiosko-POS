import {Router} from 'express';
import {createOrder, getOrderById, updateOrderStatus} from '../controllers/orderController.js';

const router = Router();

//Crear una orden
router.post('/', createOrder);

//Obtener la orden y sus detalles
router.get('/:id', getOrderById);

//Cambiar el estado de una orden
router.put('/:id/status', updateOrderStatus);

export default router;