const app = require('express')()
const logger = require('log4js').getLogger()
const moment = require('moment')
const { Nuxt, Builder } = require('nuxt')

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

if(nuxtConfig.dev) {
    new Builder(nuxt).build()
}

app.post('/graph/:type',(req, res) => {
    const { type } = req.params
    const initialData = {
        lables: [],
        tdata: [],
        hdata: [],
        udata: []
    }

    const validator = (accumulator, { dataValues }) => {
        const { date, temperature, humidity, ugm } = dataValues

        accumulator.lables.push(date)
        accumulator.tdata.push(temperature)
        accumulator.hdata.push(humidity)
        accumulator.udata.push(ugm)

        return accumulator
    }

    table.findAll().then((value) => {
        const responseData = value.reduce(validator, initialData)
        responseData.result = 'ok'

       // res.json(responseData)
        res.json(initialData.tdata[0])
    })
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

    const date = moment().format('YYYY-MM-DD HH:mm')

    table.create({ date, temperature, humidity, ugm })
    logger.info(`Request successed! ${ result }`)
    res.sendStatus(200).end()
})

app.use(nuxt.render)

const { port } = config
app.listen(port, () => logger.info(`Start server on ${port}`))
