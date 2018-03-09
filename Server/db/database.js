const sequelize = require('sequelize')
const {
    database,
    username,
    password,
    host,
    port
} = require('../config.js').db

module.exports = new sequelize(
    database,
    username,
    password,
    {
        host: host,
        port: port,
        dialect: 'mysql'
    }
)