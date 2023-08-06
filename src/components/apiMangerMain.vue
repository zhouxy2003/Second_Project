<template>
  <div>
    <div class="top">
      <p>
        <span class="firstSp Sp">🆔ID</span>
        <span class="Sp">👨‍💻Name</span>
        <span class="Sp">⌨️API</span>
        <span class="Sp">❗Done</span>
        <span class="Sp">🕹️Method</span>
        <button @click="openDialog">新增接口</button>
        <dia-log ref="diaLogRef"></dia-log>
      </p>
    </div>
    <div class="DataList">
      <ul v-for="(ta,index) in testArr" :key="ta.id" style="margin-top: 20px">
        <li class="dataLi">
          <span class="firstSp_dataLi">{{ index + 1 }}</span>
          <span class="Sp_dataLi span_name">{{ ta.name }}</span>
          <span class="span_api">{{ ta.api }}</span>
          <span class="Sp_dataLi span_done"
          >{{ ta.done === "true" ? "🟢" : "🔴" }}{{ ta.done }}</span
          >
          <span class="Sp_dataLi span_method">{{ ta.method }}</span>
          <el-button
              plain
              type="primary"
              size="small"
              :key="'edit-button-' + ta.name"
          >编辑
          </el-button
          >
          <el-button
              plain
              type="danger"
              size="small "
              :key="'delete-button-' + ta.name"
              @click="deleteArr(index)"
          >删除
          </el-button
          >
        </li>
      </ul>
    </div>


  </div>
</template>

<script>
import diaLog from "./MainUse/dialog/dialog";

export default {
  name: "apiMangerMain",
  props: ["testArr"],
  components: {
    diaLog
  },
  methods: {
    openDialog() {
      const LogRef = this.$refs.diaLogRef;
      LogRef.dialogVisible = true;

      // 并在每次点击清空上次的表格填写内容
      Object.keys(LogRef.form).forEach((item) => {
        LogRef.form[item] = "";
      });
    },
    deleteArr(val) {
      console.log(val)
      this.$props.testArr.splice(val, 1)
    }
  },
  data() {
    return {
      diaLogRef: {},
      isShowBox: true
    };
  },
};
</script>

<!-- 在此处对样式进行 修改为scoped（局部生效）我引入组件被覆盖 -->
<style scoped>
.top {
  width: 100%;
  height: 60px;
  border-radius: 5px;
  background-color: #f8fbfe;
  /* 此部分暂时解决 缩小时, 文本溢出换行 */
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.firstSp {
  float: left;
  line-height: 60px;
  border-right: 1px solid #ddd;
}

.Sp {
  float: left;
  line-height: 60px;
  border-right: 1px solid #ddd;
  width: 18%;
}

.top button {
  width: 80px;
  height: 40px;
  margin-top: 10px;
  border: none;
  color: white;
  border-radius: 5px;
  background-color: rgb(64, 158, 255);
}

.top button:hover {
  background-color: rgb(102, 177, 255);
}

.DataList {
  width: 100%;
  height: 700px;
  margin-top: 10px;
  border-radius: 5px;
  background-color: #f8fbfe;
  overflow: scroll;
}

.dataLi {
  width: 100%;
  height: 50px;
}

.firstSp_dataLi {
  margin-left: 10%;
  display: flex;
  line-height: 60px;
  margin-right: 2%;
  width: 18%;
}

.Sp_dataLi {
  color: rgb(97, 107, 129);
  float: left;
  display: flex;
  line-height: 60px;
  width: 18%;
}

.span_name {
  color: rgb(102, 177, 255);
  margin-right: 5%;
  width: 20%;
  display: flex;
  margin-left: 2%;
}

.span_api {
  color: rgb(97, 107, 129);
  width: 25%;
  display: flex;
  margin: 0 auto;
  padding-right: 10%;
  line-height: 60px;
}

.span_done {
  color: rgb(97, 107, 129);
  width: 20%;
  display: flex;
  padding-right: 5%;
  margin-left: 2%;
}

.span_method {
  color: rgb(87, 168, 84);
  display: flex;
  padding-left: 5%;
  width: 20%;
}

/* 对span宽度占比 百分比 显示化 */
.dataLi {
  display: flex;
}

.dataLi span {
  display: flex;
  box-sizing: border-box; /* 保证 padding 和 border 不会增加元素宽度 */


  /* 此部分暂时解决 缩小时, 文本溢出换行 */
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}

.el-button {
  width: 50px;
  height: 40px;
  line-height: 40px;
  border-right: 1px solid #ddd;
  display: flex; /* 使用 flex 布局 */
  align-items: center; /* 垂直居中 */
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
}



</style>
