const sequelize = require('sequelize')
const config = require('../config.js')

const db = new sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: 'mysql'
    }
)

module.exports = db