module.exports = {
    loading: {
        color: 'blue'
    },

    head:{
        link: [
            { rel: "stylesheet", href: "//bootswatch.com/3/yeti/bootstrap.min.css"}
        ],
        meta: [
            { charset: 'u4f-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { property: 'og:url', content: 'http://foo.bar'},
            { property: 'og:title', content: 'AirQualityTool - 공기품질측정기'}
        ],
        script: [
            { src: "//code.jquery.com/jquery-3.3.1.min.js" },
            { src: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" },
            { src: "//code.highcharts.com/stock/highstock.js" },
            { src: "//code.highcharts.com/stock/modules/exporting.js" },
            { src: "//code.highcharts.com/stock/modules/export-data.js" }
        ]
    },
}