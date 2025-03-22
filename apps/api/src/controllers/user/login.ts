import { Request, Response } from 'express';
import { User } from '../../models';

export async function login(req: Request, res: Response) {
    const { email, passwordHash } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).send({ message: `user '${email}' not found` });
    }

    console.log(user.passwordHash, passwordHash);
    if (user.passwordHash.toString() !== passwordHash) {
        return res.status(401).send({ message: 'wrong password!' });
    }

    req.session.loggedInUserId = user.id;
    return res.send({ message: 'login successful' });
}
