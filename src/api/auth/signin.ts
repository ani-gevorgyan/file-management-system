import { Router, Request, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import authService from '../../services/auth.service';

const router: Router = Router();

router.post(
  '/signin',
  asyncMiddlewareWrapper(async (req: Request, res: Response) => {
    const data = {
      id: req.body.id,
      password: req.body.password,
    };

    const loginResponse = await authService.login(data);
    res.status(200).json({ data: loginResponse });
  }),
);

export default router;
