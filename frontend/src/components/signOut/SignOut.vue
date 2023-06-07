<template>
    <div>
        <h1>signOut success</h1>
    </div>
</template>

<script>
    import Vue from 'vue'
    export default {
        mounted() {
            Vue.prototype.$jwt=undefined
            this.$router.push('/home')
        },
    }
</script>
