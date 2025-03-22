import app from './app';
import sequelize from './configs/sequelize';

const PORT = 3333;

async function startServer() {
    await sequelize.sync({ force: true });

    app.listen(PORT, () => {
        console.log(`Listening at http://localhost:${PORT}/api`);
    });
}

startServer();
