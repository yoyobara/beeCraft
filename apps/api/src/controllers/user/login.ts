import { Request, Response } from 'express';
import { User } from '../../models';
import { compare } from 'bcryptjs';

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).send({ message: `user '${email}' not found` });
    }

    const passwordMatches = await compare(password, user.passwordHash);
    if (!passwordMatches) {
        return res.status(401).send({ message: 'wrong password!' });
    }

    req.session.loggedInUserId = user.id;
    return res.send({ message: 'login successful' });
}
