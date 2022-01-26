import { Router } from 'express';
import { orderController } from './controller';
import { auth } from "../../middlewares/auth";
const router: Router = Router();
router.post('/',[auth.validateToken],orderController.createOrder);
export default router;