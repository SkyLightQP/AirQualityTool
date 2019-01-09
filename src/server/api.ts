import { express, logger } from './app';
import config from "./config";
import moment from "moment";
import db from './db/index';

const router = express.Router();

const table = db.AirData;

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

router.get('/temperature', (req, res) => {
    sendJsonData(res, 'temperature');
});

router.get('/humidity', (req, res) => {
    sendJsonData(res, 'humidity');
});

router.get('/ugm', (req, res) => {
    sendJsonData(res, 'ugm');
});

router.post('/push/:temp/:hum/:ugm/', (req, res) => {
    const {
        temp: temperature,
        hum: humidity,
        ugm
    } = req.params;

    const headers: string = JSON.stringify(req.headers);
    const token = req.headers['x-aqt-token'];

    const result = `temperature: ${temperature}, humidity: ${humidity}, dust: ${ugm}, headers: ${headers}`;

    if(token === undefined){
        res.send([{"code": 401, "message": "token 값이 비어있습니다."}]).end();
        return;
    }

    if (config.token !== token) {
        logger.warn(`Request failed! ${ result }`);
        res.send([{"code": 401, "message": "올바르지 않은 token입니다."}]).end();
        return;
    }

    const date = moment().unix() * 1000;

    table.create({date, temperature, humidity, ugm});
    logger.info(`Request successed! ${ result }`);
    res.sendStatus(200).end();
});

export default {
    router
};
