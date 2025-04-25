import { User } from '../models';

export declare module 'express-session' {
    interface SessionData {
        loggedInUserId: number;
    }
}

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}
