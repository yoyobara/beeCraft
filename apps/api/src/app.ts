/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

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
        secret: 'my-secret', // a secret string used to sign the session ID cookie
        resave: false, // don't save session if unmodified
        saveUninitialized: false, // don't create session until something stored
        cookie: {
            secure: false,
        },
    })
);

app.use('/user', userRouter);

export default app;
