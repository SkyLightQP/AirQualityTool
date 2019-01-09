<template>
    <div class="graph" :id="name"></div>
</template>

<script>
    export default {
        props: {
            name: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .graph {
        margin-top: 1em;
        height: 600px;
    }
</style>