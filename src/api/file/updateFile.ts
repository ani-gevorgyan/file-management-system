import { Router, Response } from 'express';
import multer from 'multer';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';
import fileService from '../../services/file.service';
import { RequestWithUser } from '../../interfaces/auth';

const router: Router = Router();
const upload = multer({ dest: './uploads' });

router.put(
  '/update/:id',
  upload.single('file'),
  asyncMiddlewareWrapper(requireToBeAuthenticated),
  asyncMiddlewareWrapper(async (req: RequestWithUser, res: Response) => {
    const id = req.params.id;
    const { file } = req;
    const newfile = await fileService.updateFile(id, file!);
    res.status(200).json({ data: newfile });
  }),
);

export default router;
