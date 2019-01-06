import Sequelize from 'sequelize';

import config from '../config';

const host = config.host;
const port = config.port;

module.exports = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host,
        port,
        dialect: 'mysql'
    }
);
