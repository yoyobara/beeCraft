import { Request, Response } from 'express';
import { User } from '../../models';

export async function info(req: Request, res: Response) {
    const id = req.session.loggedInUserId;
    const username = (await User.findByPk(id))?.username;

    if (id) {
        res.send({ id, username });
    } else {
        res.status(401).send({ message: 'Unknown user' });
    }
}
