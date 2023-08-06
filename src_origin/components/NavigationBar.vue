<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="接口管理" name="first"></el-tab-pane>
      <el-tab-pane label="接口测试" name="second"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script >
export default {
  name:"NavigationBar",
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style>

</style>