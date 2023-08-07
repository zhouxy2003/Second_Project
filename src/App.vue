<template>
  <div id="app">
    <!-- <admin-login v-if="sin_in" @change-done="updateDone"></admin-login> -->
    <!-- 此行勿删 -->
    <admin-login v-if="sin_in" @change-done="updateDone"></admin-login>
    <!-- 布局容器   -->
    <!-- <el-container v-if="isShow"> -->

    <!-- 此行勿删 -->
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
      testArr: [],
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

// =====================================================
// 这里在本地创建了db.json 也就是通过json-server模拟服务器 从而模拟从服务器获取数据
//  请求数据      把数据都保存到本地
      // 创建XHR对象
      const xhr = new XMLHttpRequest();

      // 设置请求方法和URL
      xhr.open("GET", `http://localhost:3000/APIDATA`, true);

      // 监听XHR对象的load事件
      xhr.onload = () => {
        // 检查响应状态
        if (xhr.status === 200) {
          // 将响应数据解析为JSON格式
          const data = JSON.parse(xhr.responseText);

          // 将JSON数据赋值给Vue组件的data中的数组
          this.testArr = data;
        } else {
          console.error('Request failed. Status:', xhr.status);
        }
      };

      // 监听XHR对象的error事件
      xhr.onerror = () => {
        console.error('Request failed.');
      };

      // 发送请求
      xhr.send();
    }

  },
// ========================================================
  created() {
    // 监听自定义事件，并处理传递的数据
    Bus.$on("uploadForm", (formData) => {
      const copiedForm = {...formData}; // 使用展开运算符创建一个新的对象副本

      // 使用find方法获取匹配到的对象， 根据Id标识
      const existingItem = this.testArr.find(
          (item) => item.id === copiedForm.id
      );
      if (existingItem) {
        // 如果找到对应的元素，进行覆盖
        Object.assign(existingItem, copiedForm);
      } else {
        // 如果没有找到，将新对象添加到数组中
        this.testArr.push(copiedForm);
      }
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
