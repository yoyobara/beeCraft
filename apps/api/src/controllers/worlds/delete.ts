import { Request, Response } from 'express';
import { World } from '../../models';
import { msg } from '../../utils/response';

export async function deleteWorld(req: Request, res: Response) {
    const { worldId } = req.query;

    const world = await World.findByPk(worldId);
    if (world === null) {
        return res.status(404).send(msg('no such world'));
    }
    if (world.userId !== req.user.id) {
        return res.status(403).send(msg("you can't access this world"));
    }

    await world.destroy();
    return res.sendStatus(200);
}
