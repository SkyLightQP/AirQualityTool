import express from 'express';
import log4js from 'log4js';
import api from './api';

import { Nuxt, Builder } from 'nuxt';
import nuxtConfig from '../../nuxt.config';

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

app.use('/graph', api.router);
app.use(nuxt.render);

const port = 3000;
app.listen(port, () => logger.info(`Http server listening on ${port}`));

export {
    express,
    logger
};
