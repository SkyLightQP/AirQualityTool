const express = require('express')
const app = express()
const path = require('path')
const static = require("serve-static")
const logger = require('log4js').getLogger()
const config = require('./config.js')

logger.level = 'ALL'

app.use(static(path.join(__dirname,"public")))

const port = config.port
app.listen(port, function () {
    logger.info('Start server on ' + port);
})
