const app = require('express')()
const path = require('path')
const static = require("serve-static")
const logger = require('log4js').getLogger()
const moment = require('moment')

const config = require('./config')
const table = require('./db/index')

logger.level = 'ALL'


app.use(static(path.join(__dirname,'public')))

app.post('/graph',(req, res) => {
    var lables = []
    var tdata = []
    var hdata = []

    table.findAll().then((value) => {
        value.forEach(data => {
            lables.push(data.dataValues.date)
            tdata.push(data.dataValues.temperature)
            hdata.push(data.dataValues.humidity)
        })
        var responseData = {'result': 'ok', 'lables': lables, 'tdata': tdata, 'hdata': hdata}
        res.json(responseData)
    })
})

app.get('/arduino/:temp/:hum/:token', (req,res) => {
    const {
        temp: temperature,
        hum: humidity,
        token
    } = req.params
    if(token != config.token){
        logger.warn(`Request failed! temperature: ${temperature} / humidity: ${humidity} / token: ${token}`)
        res.sendStatus(403).end()
        return
    }
    const date = moment().format('YYYY-MM-DD HH:mm:ss')
    table.create({date, temperature, humidity})
    logger.info(`Request successed! temperature: ${temperature} / humidity: ${humidity} / token: ${token}`)
    res.sendStatus(200).end()
})

const port = config.port
app.listen(port, () => {
    logger.info(`Start server on ${port}`)
})
