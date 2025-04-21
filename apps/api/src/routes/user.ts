import { Router } from 'express';

import { info, login, logout, register } from '../controllers/user';
import { authenticate } from '../middlewares/auth';

export const userRouter: Router = Router();

userRouter.get('/info', authenticate, info);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/register', register);
