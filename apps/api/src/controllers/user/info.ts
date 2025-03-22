import { Request, Response } from 'express';

export function info(req: Request, res: Response) {
    if (req.session.loggedInUserId) {
        res.send({ id: req.session.loggedInUserId });
    } else {
        res.status(401).send({ message: 'Unknown user' });
    }
}
