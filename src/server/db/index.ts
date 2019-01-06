const Sequelize = require('sequelize')
const db = require('./database')

const table = {
    date: {
        type: Sequelize.STRING(128)
    },
    temperature: {
        type: Sequelize.STRING(128)
    },
    humidity: {
        type: Sequelize.STRING(128)
    },
    ugm: {
        type: Sequelize.STRING(128)
    }
}

const AirData = db.define('AirData', table, { timestamps: false })

db.sync()

module.exports = AirData
