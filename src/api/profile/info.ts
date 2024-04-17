import { Router, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';
import { RequestWithUser } from '../../interfaces/auth';
import userService from '../../services/user.service';

const router: Router = Router();

router.get(
  '/info',
  asyncMiddlewareWrapper(requireToBeAuthenticated),
  asyncMiddlewareWrapper(async (req: RequestWithUser, res: Response) => {
    const userId = req.user.id;
    const info = await userService.getUserInfo(userId);
    res.status(200).json({ data: { info } });
  }),
);

export default router;
