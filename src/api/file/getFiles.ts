import { Router, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';
import fileService from '../../services/file.service';
import { RequestWithUser } from '../../interfaces/auth';

const router: Router = Router();

router.get(
  '/list',
  asyncMiddlewareWrapper(requireToBeAuthenticated),
  asyncMiddlewareWrapper(async (req: RequestWithUser, res: Response) => {
    const offset = req.query.page;
    const data = await fileService.getFiles(+offset!);
    res.status(200).json({ data });
  }),
);

export default router;
