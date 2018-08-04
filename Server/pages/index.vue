<template>
    <section>
        <div id="Container" class="container">
            <div class="row">
                <div class="col-lg-6">
                    <!-- TODO: 그래프 추가 -->
                </div>
                <div class="col-lg-6">
                    <!-- TODO: 그래프 추가 -->
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <!-- TODO: 그래프 추가 -->
                </div>
                <div class="col-lg-6">
                    <Panel style="text-align: center;">
                        <h3><strong>미세먼지 단계</strong></h3>
                        <ColorText color="info">0 ~ 30 좋음</ColorText>
                        <ColorText color="success"> ~80 보통</ColorText>
                        <ColorText color="warning"> ~150 나쁨</ColorText>
                        <ColorText color="danger"> 151~ 매우나쁨</ColorText>
                    </Panel>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Panel from '~/components/Panel'
    import ColorText from '~/components/ColorText'

    export default {
        components: {
            Panel,
            ColorText
        }
    }
</script>

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