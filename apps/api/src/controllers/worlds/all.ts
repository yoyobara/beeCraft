import { Request, Response } from 'express';

export async function getAllWorlds(req: Request, res: Response) {
    const worlds = await req.user.getWorlds({
        attributes: ['id', 'name'],
        order: [['updatedAt', 'DESC']],
    });
    res.send(worlds);
}
