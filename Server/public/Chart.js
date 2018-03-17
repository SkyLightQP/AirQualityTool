const elementTemperature = document.getElementById('temperature')
const elementHumidity = document.getElementById('humidity')

$(document).ready(() => {
    $.ajax({
        url: './graph',
        type: 'post',
        success: (result) => {
            if (result.result !== 'ok') return

            const temperatureChart = new Chart(elementTemperature, {
                type: 'line',
                data: {
                    labels: result.lables,
                    datasets: [{
                        label: '온도',
                        data: result.tdata,
                        fill: false,
                        borderColor: ['rgba(255, 99, 132, 0.8)']
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            })
            const humidityChart = new Chart(elementHumidity, {
                type: 'line',
                data: {
                    labels: result.lables,
                    datasets: [{
                        label: '습도',
                        data: result.hdata,
                        fill: false,
                        borderColor: ['rgba(99, 132, 255, 0.8)']
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            })
        }
    })
})