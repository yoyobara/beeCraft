import { Router } from "express";

declare module "express-session" {
    interface SessionData {
		loggedInUser: {
			username: string,
			data: string[]
		}
    }
}

const users = [
	{
		email: "yotam@gmail.com",
		username: "yotam",
		password: "hello",
		data: []
	},
	{
		email: "il@com",
		username: "il",
		password: "heo",
		data: []
	},
	{
		email: "gmail@com",
		username: "gmail",
		password: "hell",
		data: []
	}
]

const userRouter: Router = Router();

userRouter.get("/user", (req, res) => {
	if (req.session.loggedInUser) {
		res.send(req.session.loggedInUser)
	} else {
		res.status(401).send({"message": "Unknown user"});
	}
});

userRouter.post("/login", (req, res) => {
	const {email, password} = req.body;

	const user = users.find((user) => user.email === email);

	if (!user) {
		return res.status(404).send({"message": `user '${email}' not found`})
	}

	if (user.password !== password) {
		return res.status(401).send({"message": "wrong password!"})
	}

	req.session.loggedInUser = {
		username: user.username,
		data: user.data
	}
	return res.send({"message": "login successful"});
});

userRouter.post("/logout", (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(500).send({"message": "could not stop session"});
		}
	});

	res.send({"message": "logged out"});
});

userRouter.post("/register", (req, res) => {
	const { email, username, password } = req.body;

	if (users.some((user) => user.email === email)) {
		res.status(409).send({"message": "user with that email already exists"});
	}

	const newUser = {
		email,
		username,
		password,
		data: []
	}

	users.push(newUser);
	req.session.loggedInUser = newUser;
	return res.send({"message": "register successful"})
})

export default userRouter;