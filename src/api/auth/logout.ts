import { Router, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import authService from '../../services/auth.service';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';
import { RequestWithUser } from '../../interfaces/auth';

const router: Router = Router();

router.post(
  '/logout',
  asyncMiddlewareWrapper(requireToBeAuthenticated),
  asyncMiddlewareWrapper(async (req: RequestWithUser, res: Response) => {
    const userId = req.user.id;
    const authToken = await authService.logout(userId);
    res.status(200).json({ data: { token: authToken } });
  }),
);

export default router;
