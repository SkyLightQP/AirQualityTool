const temperaturee = document.getElementById('temperature')
const humidityy = document.getElementById('humidity')

$(document).ready(function() {
    $.ajax({
        url: './graph',
        type: 'post',
        success: (result) => {
            if (result.result !== 'ok') return
            const temperatureChart = new Chart(temperaturee, {
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
            const humidityChart = new Chart(humidityy, {
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
