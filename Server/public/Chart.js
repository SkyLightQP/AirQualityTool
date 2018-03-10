const temperature = document.getElementById('temperature').getContext("2d")
const humidity = document.getElementById('humidity').getContext("2d")

const temperatureChart = new Chart(temperature, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '온도',
            data: [12, 100, 3, 5, 2, 3],
            fill: false,
            borderColor: ['rgba(255, 99, 132, 0.8)']
        }]
    },
    options: {
        scales: {
            yAxes: [{
                stacked: true
            }]
        },
        legend: {
            labels: {
                defaultFontFamily: ['Nanum Barun Gothic', 'Nanum Gothic']
            }
        }
    }
});
const humidityChart = new Chart(humidity, {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange", "Orange", "Orange", "Orange", "Orange"],
        datasets: [{
            label: '습도',
            data: [12, 19, 3, 5, 2, 50],
            fill: false,
            borderColor: ['rgba(99, 132, 255, 0.8)']
        }]
    },
    scales: {
        yAxes: [{
            stacked: true
        }]
    }
});