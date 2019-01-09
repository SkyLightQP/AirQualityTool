<template>
    <div>
        <Header/>
        <div class="columns">
            <div class="column is-one-fifth">
                <SideMenu/>
            </div>
            <div class="column">
                <nuxt/>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from './Header'
    import SideMenu from "../components/SideMenu";

    export default {
        components: {
            SideMenu,
            Header
        }
    }
</script>
