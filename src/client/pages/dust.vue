<template>
    <Graph name="ugm"/>
</template>

<script>
    import Graph from "../components/Graph";
    import axios from "axios";
    import chart from "~/assets/chart.js";

    export default {
        name: "dust",
        components: {Graph},
        mounted() {
            axios.get('./graph/ugm')
                .then(res => chart.createStock('ugm', '미세먼지', '#B78463', '㎍/㎥', res.data));
        }
    }
</script>

<style scoped>

</style>