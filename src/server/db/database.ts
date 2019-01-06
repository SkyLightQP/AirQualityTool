const sequelize = require('sequelize')
const {
    database,
    username,
    password,
    host,
    port
} = require('../config').db

module.exports = new sequelize(
    database,
    username,
    password,
    {
        host,
        port,
        dialect: 'mysql'
    }
)
