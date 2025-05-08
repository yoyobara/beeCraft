import { Router } from 'express';

import { authenticate } from '../middlewares/auth';
import { getPoints } from '../controllers/points';

export const pointsRouter: Router = Router();

pointsRouter.use(authenticate);

pointsRouter.get('/', getPoints);
