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

worldRouter.get('/', getAllWorlds);
worldRouter.post('/', createNewWorld);
worldRouter.patch('/', renameWorld);
worldRouter.delete('/', deleteWorld);
