import { Router } from 'express';

import { authenticate } from '../middlewares/auth';
import {
    getPoints,
    deletePoint,
    createNewPoint,
    patchPoint,
} from '../controllers/points';

export const pointsRouter: Router = Router();

pointsRouter.use(authenticate);

pointsRouter.get('/', getPoints);
pointsRouter.post('/new', createNewPoint);
pointsRouter.patch('/edit', patchPoint);
pointsRouter.post('/delete', deletePoint);
