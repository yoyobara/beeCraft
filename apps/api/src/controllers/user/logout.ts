import { Request, Response } from 'express';

export function logout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send({ message: 'could not stop session' });
        }
    });

    res.sendStatus(200);
}
