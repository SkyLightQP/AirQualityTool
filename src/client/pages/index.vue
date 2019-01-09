<template>
    <section>
        <div class="columns">
            <div class="column is-one-fifth">
                <SideMenu/>
            </div>
            <div class="column">
                본문
            </div>
        </div>

    </section>
</template>

<script>
    import SideMenu from "../components/SideMenu";

    export default {
        components: {
            SideMenu

        },
        mounted() {
            require('~/assets/chart.js')
        }
    }
</script>