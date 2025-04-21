import express, { Express } from 'express';
import cors from 'cors';

import { sessionHandler } from './middlewares/session';
import { userRouter, worldRouter } from './routes';

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
app.use('/world', worldRouter);

export default app;
