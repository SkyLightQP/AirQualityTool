<template>
    <aside id="menu" class="menu">
        <p class="menu-label">
            그래프
        </p>
        <ul class="menu-list">
            <li><a>온도</a></li>
            <li><a>습도</a></li>
            <li><a>공기품질</a></li>
        </ul>
        <p class="menu-label">
            정보
        </p>
        <ul class="menu-list">
            <li><a>대기오염 기준</a></li>
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
</style>