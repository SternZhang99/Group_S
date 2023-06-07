<template>
    <div>
        <h1>login success</h1>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        mounted() {
            let jwt = window.location.href.split('id_token=')[1].split('&')[0]
            Vue.prototype.$jwt=jwt
            this.$router.push('/home')
        },
    }
</script>
