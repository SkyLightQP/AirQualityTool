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

window.onload = () => {
    /*Highcharts.setOptions({
        global: {
            timezoneOffset: 5 * 60,
            useUTC: false
        }
    });
    $.getJSON('./graph/temperature', (data) => {
        createStock('temperature', '온도', '#FF6384', '℃', data);
    });
    $.getJSON('./graph/humidity', (data) => {
        createStock('humidity', '습도', '#6384FF', '%', data);
    });
    $.getJSON('./graph/ugm', (data) => {
        createStock('ugm', '미세먼지', '#B78463', '㎍/㎥', data);
    });*/
}