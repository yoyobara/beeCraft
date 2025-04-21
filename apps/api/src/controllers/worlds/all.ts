import { Request, Response } from 'express';

export async function getAllWorlds(req: Request, res: Response) {
    const worlds = await req.user.getWorlds();
    res.send(worlds);
}
