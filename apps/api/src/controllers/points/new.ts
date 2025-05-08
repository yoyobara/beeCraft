import { Request, Response } from 'express';
import { PointOfInterest, World } from '../../models';
import { msg } from '../../utils/response';

export async function createNewPoint(req: Request, res: Response) {
    const { worldId, point } = req.body;

    const world = await World.findByPk(worldId);
    if (!world) {
        return res.status(404).send(msg('no such world...'));
    }
    if (world.userId !== req.user.id) {
        return res
            .status(403)
            .send(msg("you don't have access to view this world"));
    }

    const nameExists = await PointOfInterest.findOne({
        where: { name: point.name, worldId },
    });

    if (nameExists) {
        return res.status(409).send(msg('world with that name exists...'));
    }

    world.createPoint(point);
    return res.sendStatus(200);
}
