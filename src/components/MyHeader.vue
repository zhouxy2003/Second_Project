<template>
 <div>
    <!--标题-->
   <h2 class="titleWord">🖥️Http接口管理系统</h2>
   <!--用户区 引入图片-->
   <div class="logo_user">
     <el-avatar  icon="el-icon-user-solid"></el-avatar>
   </div>
   <!--
      显示用户为 admin 或者 user (后期配合登录来动态决定)
      提供首页和退出登录选项
   -->
   <div class="selectUser">
     <el-dropdown>
       <el-button type="primary">
         admin<i class="el-icon-arrow-down el-icon--right"></i>
       </el-button>
       <el-dropdown-menu slot="dropdown" >
         <el-dropdown-item></el-dropdown-item>
         <el-dropdown-item>首页</el-dropdown-item>
         <el-dropdown-item @click="out"><p @click="out">退出登录</p> </el-dropdown-item>
       </el-dropdown-menu>
     </el-dropdown>
   </div>
   <!--欢迎语-->
   <div class="welcome">
      <h4>Welcome to the system!</h4>
   </div>
 </div>
</template>

<script>
  export default {
    name:"MyHeader",
    methods: {
      handleClick() {
        alert('button click');
      },
      out(){
        console.log("点击成功")
        this.$emit("change-done", false);
      }
    }
  }
</script>

<style>
  .titleWord{
    float: left;
    line-height: 3rem;
  }
  .logo_user{
    float: right;
    margin-top:7px;
  }
  .selectUser{
    float: right;
    margin-right: 1%;
    margin-top: 9px;
  }
  .welcome{
    float: right;
    margin-right: 1%;
    line-height: 3.5rem;
  }


  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>