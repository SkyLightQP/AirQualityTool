import express from 'express';
import log4js from 'log4js';
import moment from 'moment';

import { Nuxt, Builder } from 'nuxt';
import nuxtConfig from '../../nuxt.config';

import config from './config';
import db from './db/index';

const table = db.AirData;

const app = express();
const logger = log4js.getLogger();

if (process.env.NODE_ENV === 'production') {
    logger.level = 'ALL';
} else if (process.env.NODE_ENV === 'development') {
    logger.level = 'DEBUG';
    nuxtConfig.dev = true;
}

const nuxt = new Nuxt(nuxtConfig);

if (nuxtConfig.dev) {
    new Builder(nuxt).build();
}

const sendJsonData = (res, type: string) => {
    table.findAll().then((data) => {
        const initialData = [ ];
        data.forEach(eachData => {
            const arrays = []
            arrays.push(Number(eachData.dataValues['date']));
            arrays.push(Number(eachData.dataValues[type]));
            initialData.push(arrays);
        });
        res.json(initialData);
    });
};

app.get('/graph/temperature', (req, res) => {
    sendJsonData(res, 'temperature');
});
app.get('/graph/humidity', (req, res) => {
    sendJsonData(res, 'humidity');
});
app.get('/graph/ugm', (req, res) => {
    sendJsonData(res, 'ugm');
});

app.get('/arduino/:temp/:hum/:ugm/:token', (req, res) => {
    const {
        temp: temperature,
        hum: humidity,
        ugm,
        token
    } = req.params;

    const result = `temperature: ${temperature} / humidity: ${humidity} / Dust: ${ugm} / token: ${token}`;

    if (config.token !== token) {
        logger.warn(`Request failed! ${ result }`);
        res.sendStatus(403).end();
        return;
    }

    const date = moment().unix();

    table.create({date, temperature, humidity, ugm});
    logger.info(`Request successed! ${ result }`);
    res.sendStatus(200).end();
});

app.use(nuxt.render);

const port = 3000;
app.listen(port, () => logger.info(`Http server listening on ${port}`));
