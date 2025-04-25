import { Request, Response } from 'express';
import { msg } from '../../utils/response';

export function logout(req: Request, res: Response) {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send(msg('could not stop session'));
        }
    });

    res.sendStatus(200);
}
