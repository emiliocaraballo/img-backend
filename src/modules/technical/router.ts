import { Router } from 'express';
import { technicalController } from './controller';
const router: Router = Router();
router.post('/' ,technicalController.createTechnical);
router.get('/orders' ,technicalController.getTechnicalOrder);
export default router;