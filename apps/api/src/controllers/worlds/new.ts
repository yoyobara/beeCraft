import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { World } from '../../models';
import { msg } from '../../utils/response';

export async function createNewWorld(req: Request, res: Response) {
    let { name } = req.body;

    if (!name) {
        name = `new-world-${randomUUID()}`;
    }

    const worldExists = await World.findOne({
        where: { name, userId: req.user.id },
    });

    if (worldExists) {
        res.status(409).send(msg(`world ${name} exists already`));
    } else {
        await req.user.createWorld({ name });
        res.sendStatus(200);
    }
}
