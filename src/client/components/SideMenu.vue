<template>
    <aside id="menu" class="menu">
        <p class="menu-label">
            그래프
        </p>
        <ul class="menu-list">
            <li><nuxt-link to="/">온도</nuxt-link></li>
            <li><nuxt-link to="/humidity">습도</nuxt-link></li>
            <li><nuxt-link to="/dust">공기품질</nuxt-link></li>
        </ul>
        <p class="menu-label">
            정보
        </p>
        <ul class="menu-list">
            <li><nuxt-link to="/standard">대기오염 기준</nuxt-link></li>
        </ul>
    </aside>
</template>

<script>
    export default {
        name: "SideMenu"
    }
</script>

<style scoped lang="scss">
    #menu {
        margin-top: 1em;
        margin-left: 1em;
    }

    @media screen and (max-width: 630px) {
        #menu {
            margin-right: 1em;
        }
    }
</style>