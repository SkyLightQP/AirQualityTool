const app = require('express')()
const logger = require('log4js').getLogger()
const moment = require('moment')
const {Nuxt, Builder} = require('nuxt')

const nuxtConfig = require('./nuxt.config')

const config = require('./config')
const table = require('./db/index')

if (process.env.NODE_ENV === 'production') {
    logger.level = 'ALL'
} else if (process.env.NODE_ENV === 'development') {
    logger.level = 'DEBUG'
    nuxtConfig.dev = true
}

const nuxt = new Nuxt(nuxtConfig)

if (nuxtConfig.dev) {
    new Builder(nuxt).build()
}

const sendJsonData = (res, type) => {
    table.findAll().then((data) => {
        const initialData = [ ]
        data.forEach(eachData => {
            const arrays = []
            arrays.push(Number(eachData.dataValues['date']))
            arrays.push(Number(eachData.dataValues[type]))
            initialData.push(arrays)
        })
        res.json(initialData)
    })
}

app.get('/graph/temperature', (req, res) => {
    sendJsonData(res, 'temperature')
})
app.get('/graph/humidity', (req, res) => {
    sendJsonData(res, 'humidity')
})
app.get('/graph/ugm', (req, res) => {
    sendJsonData(res, 'ugm')
})

app.get('/arduino/:temp/:hum/:ugm/:token', (req, res) => {
    const {
        temp: temperature,
        hum: humidity,
        ugm,
        token
    } = req.params

    const result = `temperature: ${temperature} / humidity: ${humidity} / Dust: ${ugm} / token: ${token}`

    if (config.token !== token) {
        logger.warn(`Request failed! ${ result }`)
        res.sendStatus(403).end()
        return
    }

    const date = moment().unix()

    table.create({date, temperature, humidity, ugm})
    logger.info(`Request successed! ${ result }`)
    res.sendStatus(200).end()
})

app.use(nuxt.render)

const {port} = config
app.listen(port, () => logger.info(`Start server on ${port}`))
