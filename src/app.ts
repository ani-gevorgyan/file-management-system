import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { BASE_URL } from './constants';
import errorHandler from './errors/errorHandler';
import authRouter from './api/auth';
import profileRouter from './api/profile';
import fileRouter from './api/file';

async function initializeApp(): Promise<Application> {
  const app: Application = express();

  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(BASE_URL, authRouter);
  app.use(BASE_URL, profileRouter);
  app.use(BASE_URL, fileRouter);

  app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Welcome to File Managing System!');
  });

  app.all('*', (req: Request, res: Response) => {
    res.status(404).json({ error: 'Route not found' });
  });

  app.use(errorHandler);

  return app;
}

export default initializeApp;
