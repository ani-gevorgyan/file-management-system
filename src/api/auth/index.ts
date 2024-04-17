import { Router } from 'express';
import signup from './signup';
import signin from './signin';
import logout from './logout';
import refreshToken from './refreshToken';

const router: Router = Router();

const BASE_PATH = '/auth';

router.use(BASE_PATH, signup);
router.use(BASE_PATH, signin);
router.use(BASE_PATH, logout);
router.use(BASE_PATH, refreshToken);

export default router;
