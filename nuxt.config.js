module.exports = {
    loading: {
        color: 'blue'
    },

    head:{
        title: 'AirQualityTool - 공기품질측정기',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
        ],
        script: [
            { src: "//code.highcharts.com/stock/highstock.js" },
            { src: "//code.highcharts.com/stock/modules/exporting.js" },
            { src: "//code.highcharts.com/stock/modules/export-data.js" }
        ]
    },

    css: [
        { src: 'bulma', lang: 'sass' }
    ],

    buildDir: 'dist/client',
    srcDir: 'src/client'
}