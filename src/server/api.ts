import app from './app';
import config from "./config";
import moment from "moment";
import db from './db/index';

const router = app.express.Router();
const logger = app.logger;

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

    const token = req.headers.X_AQT_Token;
    // 아두이노 기능 여부에 따라 수정 예정

    const result = `temperature: ${temperature} / humidity: ${humidity} / Dust: ${ugm} / token: ${token}`;

    if(token === undefined){
        res.send([{"error":"Token을 찾을 수 없습니다."}]).end();
        return
    }

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

export default {
    router
};
