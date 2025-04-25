import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { User } from '../../models';
import { msg } from '../../utils/response';

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(404).send(msg(`user '${email}' not found`));
    }

    const passwordMatches = await compare(password, user.passwordHash);
    if (!passwordMatches) {
        return res.status(401).send(msg('wrong password!'));
    }

    req.session.loggedInUserId = user.id;
    return res.sendStatus(200);
}
