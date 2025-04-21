import { Request, Response } from 'express';
import { World } from '../../models';

export async function createNewWorld(req: Request, res: Response) {
    const { name } = req.body;

    const worldExists = await World.findOne({ where: { name } });

    if (worldExists) {
        res.status(409).send({
            message: `world ${name} exists already`,
        });
    } else {
        await req.user.createWorld({ name });
        res.sendStatus(200);
    }
}
