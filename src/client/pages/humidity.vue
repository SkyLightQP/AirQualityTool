<template>
    <Graph name="humidity"/>
</template>

<script>
    import Graph from "../components/Graph";
    import axios from "axios";
    import chart from "~/assets/chart.js";

    export default {
        name: "humidity",
        components: {Graph},
        mounted() {
            axios.get('./graph/humidity')
                .then(res => chart.createStock('humidity', '습도', '#6384FF', '%', res.data));
        }
    }
</script>
