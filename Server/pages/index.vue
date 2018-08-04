<template>
    <section>
        <div class="container" style="margin-top: 5rem">
            <div class="row">
                <div class="col-lg-6">
                    <div id="temperature" width="400" height="250"></div>
                    <!--<canvas id="temperature" width="400" height="250"></canvas>-->
                </div>
                <div class="col-lg-6">
                    <canvas id="humidity" width="400" height="250"></canvas>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <canvas id="dust" width="400" height="250"></canvas>
                </div>
                <div class="col-lg-6">
                    <div class="panel panel-default" style="margin-top: 3.2rem; height: 200px; min-width: 400px">
                        <div class="panel-body">
                            <div style="text-align: center;">
                                <h3><strong>미세먼지 단계</strong></h3>
                                <h5 class="text-info">0 ~ 30 좋음</h5>
                                <h5 class="text-success"> ~80 보통</h5>
                                <h5 class="text-warning"> ~150 나쁨</h5>
                                <h5 class="text-danger"> 151~ 매우나쁨</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<!-- <script>
    Highcharts.stockChart('temperature', {
        rangeSelector: {
            selected: 1
        },

        title: {
            text: '온도 테스트'
        },

        series: [{
            name: '온도',
            data: 0,
            tooltip: {
                valueDecimals: 2
            }
        }]
    })
</script>
<script src="../assets/chart.js"></script> -->