import { Request, Response } from 'express';
import { World } from '../../models';
import { msg } from '../../utils/response';

export async function createNewWorld(req: Request, res: Response) {
    const { name } = req.body;

    const worldExists = await World.findOne({ where: { name } });

    if (worldExists) {
        res.status(409).send(msg(`world ${name} exists already`));
    } else {
        await req.user.createWorld({ name });
        res.sendStatus(200);
    }
}
