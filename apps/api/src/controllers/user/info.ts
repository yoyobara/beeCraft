import { Request, Response } from 'express';

export async function info(req: Request, res: Response) {
    const { id, fullName } = req.user;

    res.send({ id, fullName });
}
