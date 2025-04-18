import { Request, Response } from 'express';
import { User } from '../../models';

export async function info(req: Request, res: Response) {
    const id = req.session.loggedInUserId;

    if (id) {
        const fullName = (await User.findByPk(id))?.fullName;
        res.send({ id, fullName });
    } else {
        res.status(401).send({ message: 'Unknown user' });
    }
}
