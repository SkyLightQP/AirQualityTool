const sequelize = require('sequelize')
const config = require('../config.js')

module.exports = new sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: 'mysql'
    }
)