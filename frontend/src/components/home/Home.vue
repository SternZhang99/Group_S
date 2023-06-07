<template>
  <div class="container" style="min-height: 100%; padding-bottom: 100px">
    <h1>FIT5225 Ass2 Group S</h1>
    <p>Please sign in first before using any function</p>
    <el-button @click="signin()">
    <a href="https://lunqi-test3.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=4lcq682drljbgruv27qvi5stcg&response_type=token&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%2FloginSuccess">log in</a>
      
    </el-button>
  </div>

</template>
<style>

</style>

<script>
import Vue from 'vue'
export default {
    methods: {
        signin() {
            Vue.prototype.$jwt='123'
        }
    }
};
</script>