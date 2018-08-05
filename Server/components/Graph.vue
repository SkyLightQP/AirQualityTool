<template>
    <div :id="name" style="height: 400px; min-width: 400px"></div>
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