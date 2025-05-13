import { Request, Response } from 'express';
import { World } from '../../models';
import { msg } from '../../utils/response';

export async function getPoints(req: Request, res: Response) {
    const world = await World.findByPk(req.query.worldId);
    if (!world) {
        return res.status(404).send(msg('no such world...'));
    }
    if (world.userId !== req.user.id) {
        return res
            .status(403)
            .send(msg("you don't have access to view this world"));
    }

    const points = await world.getPoints({
        attributes: ['id', 'name', 'x', 'y', 'z', 'notes', 'dimension'],
    });
    return res.send(points);
}
