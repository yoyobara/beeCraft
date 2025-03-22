import { Request, Response } from 'express';
import { User } from '../../models';

export async function register(req: Request, res: Response) {
    const { email, username, passwordHash } = req.body;

    const userExists = await User.findOne({ where: { email } });
    console.log(userExists);
    if (userExists) {
        return res
            .status(409)
            .send({ message: 'user with that email already exists' });
    }

    const newUser = await User.create({
        email,
        passwordHash,
        username,
    });

    req.session.loggedInUserId = newUser.id;
    return res.send({ message: 'register successful' });
}
