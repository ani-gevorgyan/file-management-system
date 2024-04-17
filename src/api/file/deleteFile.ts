import { Router, Response } from 'express';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';
import fileService from '../../services/file.service';
import { RequestWithUser } from '../../interfaces/auth';

const router: Router = Router();

router.delete(
  '/delete/:id',
  asyncMiddlewareWrapper(requireToBeAuthenticated),
  asyncMiddlewareWrapper(async (req: RequestWithUser, res: Response) => {
    const id = req.params.id;
    await fileService.deleteFile(id);
    res.status(200).json({ data: 'Success!' });
  }),
);

export default router;
