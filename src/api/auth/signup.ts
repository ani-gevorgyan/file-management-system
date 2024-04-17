import { Router, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import authService from '../../services/auth.service';
import signupValidator from '../../validators/email.validator';

const router: Router = Router();

router.post(
  '/signup',
  signupValidator,
  asyncMiddlewareWrapper(async (req: Request, res: Response) => {
    const registrationData = {
      id: req.body.id,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = await authService.signup(registrationData);

    res.status(200).json({ data: 'Successfully Registered!' });
  }),
);

export default router;
