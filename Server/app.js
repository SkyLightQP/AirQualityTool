const express = require('express')
const app = express()
const path = require('path')
const static = require("serve-static")
const logger = require('log4js').getLogger()
const config = require('./config.js')

logger.level = 'ALL'

app.use(static(path.join(__dirname,'public')))
app.get('/arduino/:temp/:hum/:token', function(req,res){
    logger.debug("temp: " + req.params.temp)
    logger.debug("hum: " + req.params.hum)
    logger.debug("token: " + req.params.token)
    res.sendStatus(200).end()
    // TODO: TOKEN 확인하기 
})

const port = config.port
app.listen(port, function () {
    logger.info('Start server on ' + port)
})
