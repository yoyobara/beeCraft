import { Router } from 'express';

import { info, login, logout, register } from '../controllers/user';

const userRouter: Router = Router();

userRouter.get('/info', info);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.post('/register', register);

export default userRouter;
