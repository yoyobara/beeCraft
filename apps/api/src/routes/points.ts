import { Router } from 'express';

import { authenticate } from '../middlewares/auth';
import { getPoints } from '../controllers/points';
import { createNewPoint } from '../controllers/points/new';
import { patchPoint } from '../controllers/points/edit';

export const pointsRouter: Router = Router();

pointsRouter.use(authenticate);

pointsRouter.get('/', getPoints);
pointsRouter.post('/new', createNewPoint);
pointsRouter.patch('/edit', patchPoint);
