const express = require('express')
const app = express()
const path = require('path')
const static = require("serve-static")
const logger = require('log4js').getLogger()
const config = require('./config.js')
const moment = require('moment')
const table = require('./db/index.js')

logger.level = 'ALL'

app.use(static(path.join(__dirname,'public')))
app.get('/arduino/:temp/:hum/:token', function(req,res){
    var temp = req.params.temp
    var hum = req.params.hum
    var token = req.params.token
    if(token == config.token){
        var date = moment().format('YYYY-MM-DD HH:mm:ss')
        console.log(date)
        table.create({
            date: date,
            temperature: temp,
            humidity: hum
        })
        logger.info(`Request successed! temperature: ${temp} / humidity: ${hum} / token: ${token}`)
        res.sendStatus(200).end()
    } else {
        logger.warn(`Request failed! temperature: ${temp} / humidity: ${hum} / token: ${token}`)
        res.sendStatus(403).end()
    }
})

const port = config.port
app.listen(port, function () {
    logger.info(`Start server on ${port}`)
})
