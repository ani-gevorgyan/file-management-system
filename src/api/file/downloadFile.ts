import { Router, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';
import fileService from '../../services/file.service';
import { RequestWithUser } from '../../interfaces/auth';

const router: Router = Router();

router.get(
  '/download/:id',
  asyncMiddlewareWrapper(requireToBeAuthenticated),
  asyncMiddlewareWrapper(async (req: RequestWithUser, res: Response) => {
    const id = req.params.id;
    const file = await fileService.getFileById(id);
    const path = `uploads/${file.name}`;
    res.status(200).download(path);
  }),
);

export default router;