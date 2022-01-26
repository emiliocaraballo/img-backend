import { Router } from 'express';
import { serviceController } from './controller';
const router: Router = Router();
router.post('/' ,serviceController.createService);
router.get('/' ,serviceController.getService);
export default router;