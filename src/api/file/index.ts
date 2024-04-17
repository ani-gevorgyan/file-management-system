import { Router } from 'express';
import upload from './upload';
import getFiles from './getFiles';
import deleteFile from './deleteFile';
import getFileById from './getFileById';
import downloadFile from './downloadFile';
import updateFile from './updateFile';

const router: Router = Router();
const BASE_PATH = '/file';

router.use(BASE_PATH, upload);
router.use(BASE_PATH, getFiles);
router.use(BASE_PATH, deleteFile);
router.use(BASE_PATH, getFileById);
router.use(BASE_PATH, downloadFile);
router.use(BASE_PATH, updateFile);

export default router;
