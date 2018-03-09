const db = require('./database.js')
const Sequelize = require('sequelize')

const AirData = db.define('AirData', {
    date: {
        type: Sequelize.STRING(128)
    },
    temperature: {
        type: Sequelize.STRING(128)
    },
    humidity: {
        type: Sequelize.STRING(128)
    }
}, {
    timestamps: false
})

db.sync()

module.exports = AirData