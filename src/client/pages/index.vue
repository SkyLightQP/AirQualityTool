<template>
    <section>
        <div id="Container" class="container">
            <div class="row">
                <div class="col-lg-6">
                    <Graph name="temperature"></Graph>
                </div>
                <div class="col-lg-6">
                    <Graph name="humidity"></Graph>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6">
                    <Graph name="ugm"></Graph>
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
    import Graph from '~/components/Graph'

    export default {
        components: {
            Panel,
            ColorText,
            Graph
        },
        mounted() {
            require('~/assets/chart.js')
        }
    }
</script>