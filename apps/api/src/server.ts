import app from './app';
import sequelize from './configs/sequelize';
import { User } from './models';

const PORT = 3333;

async function startServer() {
    await sequelize.sync({ force: true });

    await User.create({
        email: 'yotam@gmail.com',
        passwordHash:
            '$2y$11$b6wd6aDR/LZ5XIUv8TtX1.V9BWO1uNHK6iEFqOyXacMJnnt0eyqnu',
        fullName: 'yoyobara',
    });

    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}/api`);
    });
}

startServer();
