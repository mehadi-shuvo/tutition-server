// src/index.js
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './app/routes';
import globalErrorHandler from './middlewares/globalErrorhandler';
import notFound from './middlewares/notFound';

dotenv.config();

const app: Express = express();
//parsers
app.use(express.json());
app.use(
  cors({ origin: 'https://tuition-clint.vercel.app', credentials: true }),
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`Tuition server is running 🏃‍♂️🏃‍♂️`);
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
