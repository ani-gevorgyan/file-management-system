import { Router, Request, Response } from 'express';
import multer from 'multer';
import asyncMiddlewareWrapper from '../../middlewares/asyncMiddlewareWrapper';
import requireToBeAuthenticated from '../../middlewares/requireToBeAuthenticated';
import fileService from '../../services/file.service';

const router: Router = Router();
const upload = multer({ dest: './uploads' });

router.post(
  '/upload',
  upload.single('file'),
  asyncMiddlewareWrapper(requireToBeAuthenticated),
  asyncMiddlewareWrapper(async (req: Request, res: Response) => {
    const { file } = req;
    await fileService.uploadFile(file!);
    res.status(200).json({ data: 'File successfully uploaded!' });
  }),
);

export default router;
