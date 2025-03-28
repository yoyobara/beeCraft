import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { User } from '../../models';
import { SALT_ROUNDS } from '../../utils/crypto';

export async function register(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        return res
            .status(409)
            .send({ message: 'user with that email already exists' });
    }

    const newUser = await User.create({
        email,
        passwordHash: await hash(password, SALT_ROUNDS),
        username,
    });

    req.session.loggedInUserId = newUser.id;
    return res.send({ message: 'register successful' });
}
