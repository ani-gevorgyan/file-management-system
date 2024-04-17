import { Router, Request, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import tokenService from '../../services/token.service';

const router: Router = Router();

router.post(
  '/signin/new_token',
  asyncMiddlewareWrapper(async (req: Request, res: Response) => {
    const data = {
      refreshToken: req.body.refreshToken,
    };

    const authToken = await tokenService.validateRefreshToken(
      data.refreshToken,
    );
    res.status(200).json({ data: { token: authToken } });
  }),
);

export default router;
