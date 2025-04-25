import { Request, Response } from 'express';
import { World } from '../../models';
import { msg } from '../../utils/response';

export async function renameWorld(req: Request, res: Response) {
    const { worldId, newName } = req.body;

    const world = await World.findByPk(worldId);
    if (world === null) {
        return res.status(404).send(msg('no such world'));
    }
    if (world.userId !== req.user.id) {
        return res.status(403).send(msg("you can't access this world"));
    }

    const worldWithNewName = await World.findOne({
        where: { userId: req.user.id, name: newName },
    });

    if (worldWithNewName !== null) {
        return res
            .status(409)
            .send(msg('you already have a world with that name...'));
    }

    await world.update({ name: newName });
    return res.sendStatus(200);
}
