<template>
    <div id="standard">
        <table class="table is-fullwidth">
            <thead>
            <tr>
                <th></th>
                <th>PM10</th>
                <th>PM2.5</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th class="has-text-info">좋음</th>
                <td>0~30</td>
                <td>0~15</td>
            </tr>
            <tr>
                <th class="has-text-success">보통</th>
                <td>31~50</td>
                <td>16~25</td>
            </tr>
            <tr>
                <th class="has-text-warning">나쁨</th>
                <td>51~70</td>
                <td>26~35</td>
            </tr>
            <tr>
                <th class="has-text-danger">심각</th>
                <td>71~</td>
                <td>36~</td>
            </tr>
            </tbody>
        </table>
        <p id="more">- WHO 기준</p>
    </div>
</template>

<script>
    export default {
        name: "standard"
    }
</script>

<style scoped lang="scss">
    @import "~bulma";

    #standard {
        margin-top: 1em;
    }

    #more {
        font-size: 11px;
        color: $grey-light;
    }
</style>