<template>
  <div id="app">
    <!-- 布局容器   -->
    <el-container>
      <!--  头部    -->
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <!--  导航栏    -->
      <div class="Bar">
          <NavigationBar></NavigationBar>
      </div>
      <el-container>
        <!--  侧边    -->
        <el-aside>侧边</el-aside>
        <!--  中间    -->
        <el-main>内容</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入头部组件
import MyHeader from "@/components/MyHeader.vue";
// 引入导航栏组件
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  name: 'App',
  components: {
    MyHeader,NavigationBar
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
}
.el-header {
  background-color:whitesmoke;
  color: #333;
  margin-bottom: 15px;
}
.Bar{
  width: 100%;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 800px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

</style>
