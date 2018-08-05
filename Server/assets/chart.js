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
}

$(document).ready(() => {
    $.getJSON('./graph/temperature', (data) => {
        Highcharts.setOptions({
            time: {
                timezoneOffset: -9 * 60
            }
        })
        Highcharts.stockChart('temperature', {
            rangeSelector: rangeSetting,

            title: {
                text: '온도'
            },

            colors: ['#FF6384'],

            series: [{
                name: '온도',
                data: data,
                tooltip: {
                    xDateFormat: '%Y-%m-%d %H:%M:%S',
                    valueSuffix: '℃',
                    valueDecimals: 2,
                }
            }]
        })
    })
    $.getJSON('./graph/humidity', (data) => {
        Highcharts.stockChart('humidity', {
            rangeSelector: rangeSetting,

            title: {
                text: '습도'
            },

            colors: ['#6384FF'],

            series: [{
                name: '습도',
                data: data,
                tooltip: {
                    xDateFormat: '%Y-%m-%d %H:%M:%S',
                    valueSuffix: '%',
                    valueDecimals: 2
                }
            }]
        })
    })
    $.getJSON('./graph/ugm', (data) => {
        Highcharts.stockChart('ugm', {
            rangeSelector: rangeSetting,

            title: {
                text: '미세먼지'
            },

            colors: ['#B78463'],

            series: [{
                name: '미세먼지',
                data: data,
                tooltip: {
                    xDateFormat: '%Y-%m-%d %H:%M:%S',
                    valueSuffix: '㎍/㎥',
                    valueDecimals: 2
                }
            }]
        })
    })
})