<template>
  <div id="app">
    <admin-login v-if="sin_in" @change-done="updateDone"></admin-login>

    <el-container v-if="isShow">
      <!--  头部    -->
      <el-header>
        <MyHeader @change-done="out"></MyHeader>
      </el-header>
      <!--  导航栏    -->
      <div class="Bar">
        <NavigationBar @change-done="change"></NavigationBar>
      </div>
      <el-container>
        <!--  侧边    -->
        <el-aside>
          <apiMangerAside :testArr="testArr"></apiMangerAside>
        </el-aside>
        <!--  中间    -->
        <el-main>
          <apiMangerTest :testArr="testArr" v-if="isTest"></apiMangerTest>
          <apiMangerMain
              v-if="isMain"

              :testArr="testArr"
              @upData="handleData"
          ></apiMangerMain>
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
//引入接口测试界面
import apiMangerTest from "@/components/apiMangerTest.vue";

//管理左边
import apiMangerAside from "@/components/apiMangerAside.vue";
import apiMangerMain from "@/components/apiMangerMain.vue";

// 使用事件总线
import Bus from "@/Bus";

// 导入getData hook中函数， 获取最新api信息

export default {
  name: "App",
  data() {
    return {
      isShow: false,
      sin_in: true,
      isTest: false,
      isMain: true,
      //接口信息
      testArr: [],
    };
  },
  components: {
    MyHeader,
    NavigationBar,
    adminLogin,
    apiMangerAside,
    apiMangerTest,
    apiMangerMain,
  },
  methods: {
    updateDone(newDone) {
      console.log(
          "\n" +
          "   ____   __   __  _____  U _____ u ____       _      _   _      ____ U _____ u \n" +
          'U | __")u \\ \\ / / |_ " _| \\| ___"|/|  _"\\  U  /"\\  u | \\ |"|  U /"___|\\| ___"|/ \n' +
          ' \\|  _ \\/  \\ V /    | |    |  _|" /| | | |  \\/ _ \\/ <|  \\| |> \\| | u   |  _|"   \n' +
          '  | |_) | U_|"|_u  /| |\\   | |___ U| |_| |\\ / ___ \\ U| |\\  |u  | |/__  | |___   \n' +
          "  |____/    |_|   u |_|U   |_____| |____/ u/_/   \\_\\ |_| \\_|    \\____| |_____|  \n" +
          " _|| \\\\_.-,//|(_  _// \\\\_  <<   >>  |||_    \\\\    >> ||   \\\\,-._// \\\\  <<   >>  \n" +
          '(__) (__)\\_) (__)(__) (__)(__) (__)(__)_)  (__)  (__)(_")  (_/(__)(__)(__) (__) \n'
      );
      console.log(
          "\n" +
          " __        __     _                                _           _                _        \n" +
          " \\ \\      / /___ | |  ___  ___   _ __ ___    ___  | |_  ___   | |  ___    __ _ (_) _ __  \n" +
          "  \\ \\ /\\ / // _ \\| | / __|/ _ \\ | '_ ` _ \\  / _ \\ | __|/ _ \\  | | / _ \\  / _` || || '_ \\ \n" +
          "   \\ V  V /|  __/| || (__| (_) || | | | | ||  __/ | |_| (_) | | || (_) || (_| || || | | |\n" +
          "    \\_/\\_/  \\___||_| \\___|\\___/ |_| |_| |_| \\___|  \\__|\\___/  |_| \\___/  \\__, ||_||_| |_|\n" +
          "                                                                         |___/           \n"
      );

      this.isShow = newDone;
      this.sin_in = false;

      // =====================================================
      // 这里在本地创建了db.json 也就是通过json-server模拟服务器 从而模拟从服务器获取数据
      //  请求数据      把数据都保存到本地
      // 创建XHR对象
      const xhr = new XMLHttpRequest();
      // 设置请求方法和URL
      xhr.open("GET", `http://127.0.0.1:3000/APIDATA`, true);

      // 监听XHR对象的load事件
      xhr.onload = () => {
        // 检查响应状态
        if (xhr.status === 200) {
          // 将响应数据解析为JSON格式
          const data = JSON.parse(xhr.responseText);

          // 使用 .$set 更新响应式数据
          this.testArr = data;
        } else {
          console.error("Request failed. Status:", xhr.status);
        }
      };

      // 监听XHR对象的error事件
      xhr.onerror = () => {
        console.error("Request failed.");
      };

      // 发送请求
      xhr.send();
    },
    out(newDone) {
      this.isShow = newDone;
      this.sin_in = true;
      console.log("返回登录界面")
    },
    change(newDone){
      if(newDone===false){
        this.isMain=false;
        this.isTest=true;
      }
      else{
        this.isMain=true;
        this.isTest=false;
      }
    },

    // 更新arr数据
    handleData() {
      const xhr = new XMLHttpRequest();
      // 设置请求方法和URL
      xhr.open("GET", `http://127.0.0.1:3000/APIDATA`, true);

      // 监听XHR对象的load事件
      xhr.onload = () => {
        // 检查响应状态
        if (xhr.status === 200) {
          // 将响应数据解析为JSON格式
          const data = JSON.parse(xhr.responseText);

          // 使用 .$set 更新响应式数据
          this.testArr = data;
        } else {
          console.error("Request failed. Status:", xhr.status);
        }
      };

      // 监听XHR对象的error事件
      xhr.onerror = () => {
        console.error("Request failed.");
      };

      // 发送请求
      xhr.send();
    },
  },
  // ========================================================
  created() {
    // 1. 在挂载生命周期中，需要对testArr从端口获取数据，使用computed包裹
    Bus.$on("uploadForm", (formData) => {
      const copiedForm = {...formData}; // 使用展开运算符创建一个新的对象副本

      // 使用find方法获取匹配到的对象， 根据Id标识
      const existingItem = this.testArr.find(
          (item) => item.id === copiedForm.id
      );
      if (existingItem) {
        // 如果找到对应的元素，进行覆盖（浅拷贝 适用于一级属性无引用类型）
        Object.assign(existingItem, copiedForm);
      } else {
        // 如果没有找到，将新对象添加到数组中
        this.testArr.push(copiedForm);
      }
      // 数据更新
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
