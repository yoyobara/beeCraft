import { Request, Response } from 'express';
import { PointOfInterest } from '../../models';
import { msg } from '../../utils/response';

export async function patchPoint(req: Request, res: Response) {
    const { pointId, pointPatch } = req.body;

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

    if (pointPatch.name && point.name !== pointPatch.name) {
        const pointsWithSameName = await world.getPoints({
            where: { name: pointPatch.name },
        });
        if (pointsWithSameName.length > 0) {
            return res.status(409).send(msg('world with that name exists...'));
        }
    }

    await point.update(pointPatch);
    return res.sendStatus(200);
}
