import Sequelize from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';

import { User } from '../models';

const sequelize = new Sequelize({
    dialect: SqliteDialect,
    storage: './persistantDB.db',
    pool: {
        min: 1,
        max: 1,
        idle: Infinity,
    },
    models: [User],
});

export default sequelize;
