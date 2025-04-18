import express, { Express } from 'express';
import cors from 'cors';

import userRouter from './routes/user';
import { sessionHandler } from './middlewares/session';

const app: Express = express();
const ORIGIN = 'http://localhost:4200';

app.use(express.json());

app.use(
    cors({
        origin: ORIGIN, // The frontend URL
        credentials: true,
    })
);

app.use(sessionHandler);

app.use('/user', userRouter);

export default app;
