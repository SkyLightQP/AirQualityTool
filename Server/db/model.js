const db = require('./database.js')
const Sequelize = require('sequelize')

db.sync()

const model = db.define('airqualitytool', {
        date: {
            type: Sequelize.STRING
        },
        temperature: {
            type: Sequelize.STRING
        },
        humidity: {
            type: Sequelize.STRING
        }
    })

module.exports = model