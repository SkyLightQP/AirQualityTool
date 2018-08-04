<template>
    <h5 :class="'text-' + color"><slot/></h5>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                required: true
            }
        }
    }
</script>