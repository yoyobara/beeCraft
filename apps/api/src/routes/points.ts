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
pointsRouter.post('/', createNewPoint);
pointsRouter.patch('/', patchPoint);
pointsRouter.delete('/', deletePoint);
