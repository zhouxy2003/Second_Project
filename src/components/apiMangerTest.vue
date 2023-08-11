<template>
  <div>
    <!--    父亲盒子-->
    <div class="backTest">
      <!--        标题-->
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
      <!--     接口地址和信息   -->
      <div class="apiMess">
        <el-select disabled placeholder="GET" class="apiTip">
        </el-select>
        <div class="inputData">
          <el-input disabled v-model="input" placeholder="接口地址"></el-input>
        </div>
        <div class="pathData">
          <el-select v-model="portData" filterable placeholder="接口选择" class="portName">
            <el-option
                v-for="item in testArr"
                :key="item.id"
                :value="item.portName">
            </el-option>
          </el-select>
        </div>
        <button class="btn">测试</button>
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

    </div>
  </div>
</template>

<script>
export default {
  name: "apiMangerTest",
  props:["testArr"],
  data() {
    return {
      valueData: '',
      portData:'',
      donePass: false,
      doneError: false,
      input:''
    }
  },

  watch: {
    valueData: {
      //多层结构全部深度监视
      deep: true, //默认为false
      handler(a) {
        let arr=this.$props.testArr.filter(val => {
          return val.name===a;
        })
        this.$data.input=arr[0].api;

      },
    },
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
  border: 1px solid #000;
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
  border: 1px solid #000;
}

.apiTip {
  width: 120px;
  float: left;
  margin-left: 37px;
}

.inputData {
  width: 600px;
  float: left;
}

.pathData {
  width: 600px;
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
  border: 1px solid #000;
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
  border: 1px solid #000;
}

.portName{
  width: 600px;
}

</style>