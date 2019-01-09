<template>
    <Graph name="temperature"></Graph>
</template>

<script>
    import SideMenu from "../components/SideMenu";
    import Graph from "../components/Graph";
    import axios from "axios";
    import chart from "~/assets/chart.js";

    export default {
        components: {
            Graph,
            SideMenu

        },
        mounted() {
            axios.get('./graph/temperature')
                .then(res => chart.createStock('temperature', '온도', '#FF6384', '℃', res.data));
        }
    }
</script>