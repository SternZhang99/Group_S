<template>
  <div>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px" style="background-color: #fae88e">
        <el-menu
          background-color="#748866"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item-group>
            <template slot="title">Functions</template>
            <el-menu-item index="/home">Home</el-menu-item>
            <el-menu-item index="/uploadImg">Upload</el-menu-item>
            <el-menu-item index="/query">Find By Tag</el-menu-item>
            <el-menu-item index="/findByImage">Find By Image</el-menu-item>
            <el-menu-item index="/allimages">Allimages</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-user-solid" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="https://lunqi-test3.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=4lcq682drljbgruv27qvi5stcg&response_type=token&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%2FloginSuccess">login</a></el-dropdown-item>
              <el-dropdown-item><a href="/signOut">sign out</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main> <router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style>
.el-header {
  background-color: #fae88e;
  color: #d4c414;
  line-height: 60px;
}

.el-aside {
  color: #dee14f;
}

.header {
  background-color: #72ff36;
}
</style>

<script>
export default {};
</script>
