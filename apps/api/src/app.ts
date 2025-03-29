import express, { Express } from 'express';
import cors from 'cors';
import session from 'express-session';

import userRouter from './routes/user';

const app: Express = express();
const ORIGIN = 'http://localhost:4200';

app.use(express.json());

app.use(
    cors({
        origin: ORIGIN, // The frontend URL
        credentials: true,
    })
);

app.use(
    session({
        secret: 'my-secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use('/user', userRouter);

export default app;
