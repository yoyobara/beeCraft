import { Request, Response } from 'express';
import { World } from '../../models';

export async function renameWorld(req: Request, res: Response) {
    const { worldId, newName } = req.body;

    const world = await World.findByPk(worldId);
    if (world === null) {
        return res.sendStatus(404);
    }
    if (world.userId !== req.user.id) {
        return res.sendStatus(403);
    }

    const worldWithNewName = await World.findOne({
        where: { userId: req.user.id, name: newName },
    });

    if (worldWithNewName !== null) {
        return res.sendStatus(409);
    }

    await world.update({ name: newName });
    return res.sendStatus(200);
}
