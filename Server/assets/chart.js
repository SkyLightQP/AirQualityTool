$(document).ready(() => {
    $.getJSON('./graph/temperature', (data) => {
        Highcharts.stockChart('temperature', {
            rangeSelector: {
                selected: 1
            },

            title: {
                text: '온도'
            },

            series: [{
                name: '온도',
                data: data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        })
    })
    $.getJSON('./graph/humidity', (data) => {
        Highcharts.stockChart('humidity', {
            rangeSelector: {
                selected: 1
            },

            title: {
                text: '습도'
            },

            series: [{
                name: '습도',
                data: data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        })
    })
    $.getJSON('./graph/ugm', (data) => {
        Highcharts.stockChart('ugm', {
            rangeSelector: {
                selected: 1
            },

            title: {
                text: '미세먼지'
            },

            series: [{
                name: '미세먼지',
                data: data,
                tooltip: {
                    valueDecimals: 2
                }
            }]
        })
    })
})