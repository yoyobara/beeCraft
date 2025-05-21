import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';

import { sessionHandler } from './middlewares/session';
import { userRouter, worldRouter } from './routes';
import { pointsRouter } from './routes/points';

console.log('running in', process.env.NODE_ENV);

const app: Express = express();
const ORIGIN =
    process.env.NODE_ENV === 'production'
        ? 'http://localhost/'
        : 'http://localhost:4200/';

app.use(express.json());

app.use((req, res, next) => {
    console.log('got request');
    next();
});

app.use(
    cors({
        origin: ORIGIN, // The frontend URL
        credentials: true,
    })
);

app.use(sessionHandler);

app.use('/user', userRouter);
app.use('/world', worldRouter);
app.use('/points', pointsRouter);

export default app;
