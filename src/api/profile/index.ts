import { Router } from 'express';
import info from './info';

const router: Router = Router();
const BASE_PATH = '/profile';

router.use(BASE_PATH, info);

export default router;
