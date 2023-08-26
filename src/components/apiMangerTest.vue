<template>
  <div>
    <!-- 父亲盒子-->
    <div class="backTest">
      <!-- 标题-->
      <div class="title">
        <p class="deName">接口名称：</p>
        <el-select v-model="valueData" filterable placeholder="请选择" class="selectName">
          <el-option
              v-for="item in testArr"
              :key="item.id"
              :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <!--    接口地址和信息   -->
      <div class="apiMess">
        <el-select disabled placeholder="GET" class="apiTip">
        </el-select>
        <div class="inputData">
          <el-input disabled v-model="input" placeholder="接口地址"></el-input>
        </div>
        <div class="pathData">
          <el-select v-model="portData" filterable placeholder="接口选择" class="portName">
            <el-option
                v-for="item in testArrPort"
                :key="item.id"
                :value="item">
            </el-option>
          </el-select>
        </div>
        <button class="btn" @click="handleClick">测试</button>
      </div>
      <!--   成功   -->
      <div class="donePass" v-if="donePass">
        <p>201 CREATED </p>
        <el-alert
            title="请求成功"
            type="success"
            show-icon>
        </el-alert>
      </div>
      <!--   错误   -->
      <div class="doneError" v-if="doneError">
        <p>404 NOTFOUND </p>
        <el-alert
            title="请确保服务器端口打开"
            type="error"
            show-icon>
        </el-alert>
      </div>
      <div class="testBox">
        <!--   头部信息   -->
        <div class="Header">
          <p>Headers</p>
          <div class="Box">
            <!--顶部栏-->
            <div class="top">
              <div class="tools">
                <div class="circle">
                  <span class="red box"></span>
                </div>
                <div class="circle">
                  <span class="yellow box"></span>
                </div>
                <div class="circle">
                  <span class="green box"></span>
                </div>
                <div></div>
              </div>
            </div>
            <div class="word">
              <textarea v-model="head"></textarea>
            </div>
          </div>
        </div>
        <!--   主题信息   -->
        <div class="Main">
          <p>Body</p>
          <div class="Box">
            <!--顶部栏-->
            <div class="top">
              <div class="tools">
                <div class="circle">
                  <span class="red box"></span>
                </div>
                <div class="circle">
                  <span class="yellow box"></span>
                </div>
                <div class="circle">
                  <span class="green box"></span>
                </div>
                <div></div>
              </div>
            </div>
            <div class="word">
              <textarea v-model="body"></textarea>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "apiMangerTest",
  props: ["testArr"],
  data() {
    return {
      valueData: '',
      portData: '',
      donePass: false,
      doneError: false,
      input: '',
      head: "这里显示请求头信息",
      body: "这里显示接收的信息",
      testArrPort: ["exchangeRate", "dailyWord", "weather", "wordVector", "BMI", "bankCard", "Wifi","onlyId","fontConversion","car","textClassification","stock"]
    }
  },

  watch: {
    valueData: {
      //多层结构全部深度监视
      deep: true, //默认为false
      handler(a) {
        let arr = this.$props.testArr.filter(val => {
          return val.name === a;
        })
        this.$data.input = arr[0].api;

      },
    }

  },
  methods: {
    handleClick() {
      if (this.$data.valueData == '' || this.$data.portData == '') {
        alert("请正确输入信息");
        return;
      }
      console.log(1)
      let port = this.$data.portData;
      const xhr = new XMLHttpRequest();
      // 设置请求方法和URL
      xhr.open("GET", `http://localhost:3000/${port}`, true);

      // 监听XHR对象的load事件
      xhr.onload = () => {
        // 检查响应状态
        if (xhr.status === 200) {
          // 将响应数据解析为JSON格式
          this.$data.donePass = true;
          this.$data.doneError = false;
          console.log("状态码", xhr.status); //状态码
          console.log("状态字符串", xhr.statusText); //状态字符串
          console.log(xhr.getAllResponseHeaders()); //所有响应头
          this.$data.body = (xhr.response);
          this.$data.head = `状态码: ${xhr.status}\n\n状态字符串: ${xhr.statusText}\n\n响应头: \n\n${xhr.getAllResponseHeaders()}`;


        } else {
          console.error("Request failed. Status:", xhr.status);
        }
      };

      // 监听XHR对象的error事件
      xhr.onerror = () => {
        this.$data.doneError = true;
        this.$data.donePass = false;
        this.$data.body =  "这里显示请求头信息";
        this.$data.head = "这里显示接收的信息";
        console.error("Request failed.");
      };

      // 发送请求
      xhr.send();
    }
  }

}
</script>

<style scoped>
.backTest {
  width: 100%;
  height: 750px;
  border-radius: 5px;
  background-color: #f8fbfe;
}

.title {
  width: 100%;
  height: 50px;

}

.deName {
  float: left;
  font-weight: normal;
  font-size: 24px;
  margin-left: 40px;
}

.selectName {
  float: left;
  margin-top: 5px;
}

.apiMess {
  width: 100%;
  height: 60px;
  margin-top: 15px;

}

.apiTip {
  width: 120px;
  float: left;
  margin-left: 37px;
}

.inputData {
  width: 400px;
  float: left;
}

.pathData {
  width: 400px;
  float: left;
}

.btn {
  float: right;
  margin-top: 2px;
  margin-right: 20px;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  color: white;;
  background-color: rgb(64, 158, 255);
}

.donePass {
  width: 100%;
  height: 60px;
  background-color: rgb(103, 194, 58);
  margin-top: 10px;

}

.donePass p, .doneError p {
  float: left;
  margin-left: 20px;
  color: white;
  font-weight: bolder;
  font-size: 24px;
  line-height: 56px;
}


.doneError {
  width: 100%;
  height: 60px;
  background-color: rgb(245, 108, 108);
  margin-top: 10px;

}

.portName {
  width: 400px;
}

.testBox {
  width: 100%;
  height: 400px;
  margin-top: 40px;

}

.Header {
  width: 40%;
  height: 100%;
  float: left;
  border: none;

}

.Header p {
  float: left;
  margin-left: 40px;

}

.Box {
  width: 90%;
  height: 90%;
  margin-left: 35px;
  margin-top: 30px;
  border-radius: 5px;
  box-shadow: 4px 4px 8px skyblue, 4px 4px 8px #b9b9b9;
  background-color: rgb(245, 245, 245);
}

.top {
  width: 100%;
  height: 30px;

}

.tools {
  display: flex;
  align-items: center;
  padding: 9px;
}

.circle {
  padding: 0 4px;
}

.box {
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 1px;
  border-radius: 50%;
}

.red {
  background-color: #ff605c;
}

.yellow {
  background-color: #ffbd44;
}

.green {
  background-color: #00ca4e;
}


.Main {
  width: 59%;
  height: 100%;
  float: left;
  border: none;

}

.Main p {
  float: left;
  margin-left: 40px;
}

.word {
  width: 96%;
  margin-left: 2%;
  margin-top: 10px;
  height: 300px;
 overflow: auto; background-color: white;
}

textarea {
  width: 100%;
  height: 90%;
  resize: none;
  font-size: 16px;
  border: none;
}

textarea:focus {
  outline: none;
}


</style>