class Graph {
    static element = {
        temperature: document.getElementById('temperature'),
        humidity: document.getElementById('humidity')
    }

    static chartData = {
        type: 'line',
        data: { labels },
        options: {
            scales: {
                yAxes: [{ stacked: true }]
            }
        }
    }

    static success () {
        if (result !== 'ok') return

        const temperature = this.chartData
        temperature.data.datasets = [{
            fill: false,
            data: tdata,
            label: '온도',
            borderColor: ['rgba(255, 99, 132, 0.8)']
        }]

        const humidity = this.chartData
        humidity.data.datasets = [{
            fill: false,
            data: hdata,
            label: '습도',
            borderColor: ['rgba(99, 132, 255, 0.8)']
        }]

        const temperatureChart = new Chart(this.element.temperature, temperature)
        const humidityChart = new Chart(this.element.humidity, humidity)
    }

    static get query () {
        return {
            url: './graph',
            type: 'post',
            success: this.success
        }
    }

    static destroy () {
        this.element = null
        this.chartData = null
        this.success = null
        this.query = null
    }
}

$(document).ready(() => {
    $.ajax(Graph.query)

    Graph.destroy()
    Graph = null
})
