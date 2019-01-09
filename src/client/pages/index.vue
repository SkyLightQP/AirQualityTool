<template>
    <Graph name="temperature"></Graph>
</template>

<script>
    import Graph from "../components/Graph";
    import axios from "axios";
    import chart from "~/assets/chart.js";

    export default {
        components: {
            Graph
        },
        mounted() {
            axios.get('./graph/temperature')
                .then(res => chart.createStock('temperature', '온도', '#FF6384', '℃', res.data));
        }
    }
</script>