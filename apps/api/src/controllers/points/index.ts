import { Request, Response } from 'express';
import { World } from '../../models';
import { msg } from '../../utils/response';

export async function getPoints(req: Request, res: Response) {
    const { worldId } = req.body;

    const world = await World.findByPk(worldId);
    if (!world) {
        return res.status(404).send(msg('no such world...'));
    }
    if (world.userId !== req.user.id) {
        return res
            .status(403)
            .send(msg("you don't have access to view this world"));
    }

    const points = await world.getPoints({
        attributes: ['id', 'x', 'y', 'z', 'notes', 'isEnd'],
    });
    return res.send(points);
}
