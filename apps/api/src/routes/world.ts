import { Router } from 'express';

import { authenticate } from '../middlewares/auth';
import {
    getAllWorlds,
    createNewWorld,
    renameWorld,
    deleteWorld,
} from '../controllers/worlds';

export const worldRouter: Router = Router();

worldRouter.use(authenticate);

worldRouter.get('/all', getAllWorlds);
worldRouter.post('/new', createNewWorld);
worldRouter.post('/rename', renameWorld);
worldRouter.post('/delete', deleteWorld);
