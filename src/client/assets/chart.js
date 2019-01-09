const rangeSetting = {
    inputEnabled: false,
    buttons: [
        {
            type: 'hour',
            count: 2,
            text: '2시간'
        }, {
            type: 'hour',
            count: 12,
            text: '12시간'
        }, {
            type: 'day',
            count: 1,
            text: '1일'
        }, {
            type: 'day',
            count: 7,
            text: '1주일'
        }, {
            type: 'month',
            count: 1,
            text: '1개월'
        }, {
            type: 'all',
            text: '전체'
        }
    ]
};

const createStock = (name, lable, color, unit, data) => {
    Highcharts.stockChart(name, {
        rangeSelector: rangeSetting,

        title: {
            text: lable
        },

        colors: [color],

        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S'
            }
        },

        series: [{
            name: lable,
            data: data,
            tooltip: {
                xDateFormat: '%Y-%m-%d %H:%M:%S',
                valueSuffix: unit,
                valueDecimals: 2,
            }
        }],

        time: {
            timezoneOffset: 5 * 60,
            useUTC: false
        }
    });
};

export default {
    createStock
}