import { Router, Request, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import authService from '../../services/auth.service';

const router: Router = Router();

router.post(
  '/signup',
  asyncMiddlewareWrapper(async (req: Request, res: Response) => {
    const registrationData = {
      id: req.body.id,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    const data = await authService.signup(registrationData);

    res.status(200).json({ data: 'Successfully Registered!' });
  }),
);

export default router;
