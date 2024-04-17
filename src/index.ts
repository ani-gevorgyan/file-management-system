import 'reflect-metadata';
import dotenv from 'dotenv';
import { Application } from 'express';
import initializeApp from './app';
import { dataSource } from './db/ormconfig';

async function startServer(): Promise<Application> {
  try {
    dotenv.config();

    await dataSource.initialize();

    const app = await initializeApp();

    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`Magic is happening on port ${port}`);
    });

    return app;
  } catch (error) {
    console.log(`Error ---> ${error}`);
    process.exit(1);
  }
}

startServer();
