<template>
  <div id="app">
    <admin-login v-if="sin_in" @change-done="updateDone"></admin-login>
    <!-- 布局容器   -->
    <el-container v-if="isShow">
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
        <el-aside>
          <apiMangerAside :testArr="testArr"></apiMangerAside>
        </el-aside>
        <!--  中间    -->
        <el-main>
          <apiMangerMain :testArr="testArr"></apiMangerMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入头部组件
import MyHeader from "@/components/MyHeader.vue";
// 引入导航栏组件
import NavigationBar from "@/components/NavigationBar.vue";
//引入登录界面组件
import adminLogin from "@/components/adminLogin.vue";

//管理左边
import apiMangerAside from "@/components/apiMangerAside.vue";
import apiMangerMain from "@/components/apiMangerMain.vue";

// 使用事件总线
import Bus from "@/Bus";

export default {
  name: "App",
  data() {
    return {
      isShow: false,
      sin_in: true,
      //接口信息
      testArr: [
        {
          id: 1,
          name: "天气接口",
          api: "https://apiTest.cn",
          done: "false",
          method: "GET",
        },
        {
          id: 2,
          name: "交通接口",
          api: "https://apiTest.cn",
          done: "true",
          method: "GET",
        },
        {
          id: 3,
          name: "教育接口",
          api: "https://apiTest.cn",
          done: "true",
          method: "GET",
        },
      ],
    };
  },
  components: {
    MyHeader,
    NavigationBar,
    adminLogin,
    apiMangerAside,
    apiMangerMain,
  },
  methods: {
    updateDone(newDone) {
      this.isShow = newDone;
      this.sin_in = false;
    },
  },
  created() {
    // 监听自定义事件，并处理传递的数据
    Bus.$on("uploadForm", (formData) => {
      const copiedForm = {...formData}; // 使用展开运算符创建一个新的对象副本
      this.testArr.push(copiedForm);
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.el-header {
  background-color: whitesmoke;
  color: #333;
  margin-bottom: 15px;
}

.Bar {
  width: 100%;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  width: 100px;
  height: 800px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
</style>
