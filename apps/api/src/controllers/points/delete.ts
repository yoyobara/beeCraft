import { Request, Response } from 'express';
import { PointOfInterest } from '../../models';
import { msg } from '../../utils/response';

export async function deletePoint(req: Request, res: Response) {
    const { pointId } = req.query;

    const point = await PointOfInterest.findByPk(pointId);
    if (!point) {
        return res.status(404).send(msg('no such point...'));
    }

    const world = await point.getWorld();
    if (world?.userId !== req.user.id) {
        return res
            .status(403)
            .send(msg("you don't have access to view this world"));
    }

    await point.destroy();
    return res.sendStatus(200);
}
