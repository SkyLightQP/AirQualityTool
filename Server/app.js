const app = require('express')()
const path = require('path')
const static = require('serve-static')
const logger = require('log4js').getLogger()
const moment = require('moment')

const config = require('./config')
const table = require('./db/index')

logger.level = 'ALL'

app.use(static(path.join(__dirname,'public')))

app.post('/graph',(req, res) => {
    const initialData = {
        lables: [],
        tdata: [],
        hdata: []
    }

    const validator = (accumulator, { dataValues }) => {
        const { date, temperature, humidity } = dataValues

        accumulator.lables.push(date)
        accumulator.tdata.push(temperature)
        accumulator.hdata.push(humidity)

        return accumulator
    }

    table.findAll().then((value) => {
        const responseData = value.reduce(validator, initialData)
        responseData.result = 'ok'

        res.json(responseData)
    })
})

app.get('/arduino/:temp/:hum/:token', (req, res) => {
    const {
        temp: temperature,
        hum: humidity,
        token
    } = req.params

    const result = `temperature: ${temperature} / humidity: ${humidity} / token: ${token}`

    if (config.token !== token) {
        logger.warn(`Request failed! ${ result }`)
        res.sendStatus(403).end()
        return
    }

    const date = moment().format('YYYY-MM-DD HH:mm:ss')

    table.create({ date, temperature, humidity })
    logger.info(`Request successed! ${ result }`)
    res.sendStatus(200).end()
})

const { port } = config
app.listen(port, () => logger.info(`Start server on ${port}`))
