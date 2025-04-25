import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { msg } from '../utils/response';

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (req.session.loggedInUserId === undefined) {
        res.status(401).send(msg('Unknown user'));
        return;
    }

    const user = await User.findByPk(req.session.loggedInUserId);
    if (user === null) {
        res.status(401).send(msg('Unknown user'));
        return;
    }

    req.user = user;
    next();
}
