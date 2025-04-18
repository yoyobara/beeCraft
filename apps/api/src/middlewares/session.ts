import { RequestHandler } from 'express';
import session from 'express-session';

if (process.env.SESSION_SECRET === undefined) {
    throw Error(
        'please set the SESSION_SECRET environment variable (base64 value)'
    );
}

export const sessionHandler: RequestHandler = session({
    secret: Buffer.from(process.env.SESSION_SECRET, 'base64'),
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
});
