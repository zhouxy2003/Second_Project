<template>
  <div>
    <button class="fixed-button" @click="addChat">聊天</button>
    <button class="closeButton" @click="addChatClose">关闭</button>
    <chatWindow
      :chatArr="chatArr"
      v-if="isChat"
      @child-event="handleChildEvent"
    ></chatWindow>
    <div class="top">
      <p>
        <span class="firstSp Sp">🆔ID</span>
        <span class="Sp">👨‍💻Name</span>
        <span class="Sp">⌨️API</span>
        <span class="Sp">❗Done</span>
        <span class="Sp">🕹️Method</span>
        <button @click="openDialog">新增接口</button>
        <dia-log
          ref="diaLogRef"
          :testArr="testArr"
          :isEditMode="isEditMode"
          @clickDowned="handleClickDown"
          @child-event="handleChildEventArr"
        ></dia-log>
      </p>
    </div>
    <div class="DataList">
      <ul v-for="(ta, index) in testArr" :key="ta.id" style="margin-top: 20px">
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
            @click="EditArr(index)"
            >编辑
          </el-button>
          <el-button
            plain
            type="danger"
            size="small "
            :key="'delete-button-' + ta.name"
            @click="deleteArr(index)"
            >删除
          </el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import diaLog from "./MainUse/dialog/dialog";
import chatWindow from "./MainUse/dialog/chatWindow.vue";

export default {
  name: "apiMangerMain",
  props: ["testArr"],
  components: {
    diaLog,
    chatWindow,
  },
  methods: {
    openDialog(val) {
      const LogRef = this.$refs.diaLogRef;
      LogRef.dialogVisible = true;

      console.log("11");
      // 并在每次点击清空上次的表格填写内容

      // 未处于编辑时，清空上次对话， 但是保留id号
      if (this.isEditMode == false) {
        console.log("这里被跳过了吗");
        Object.keys(LogRef.form).forEach((item) => {
          // if (item === "id") {
          //   LogRef.form[item] = this.testArr.length + 1;
          // }
          LogRef.form[item] = "";
        });
      }

      // 处于编辑状态， 将数组数据 赋值给当前对话 /数据回显
      else {
        LogRef.dataValid = true; // 启用按钮 能上传时意味着APi 有效
        console.log("11");
        LogRef.form = val;
      }
    },

    // 删除数组某行数据 =======================================================
    // 这里通过fetch方法 向服务器端口发送delete请求 删除db.json中对应的数据
    async deleteArr(val) {
      const confirmation = confirm("是否确定要删除？");
      if (confirmation) {
        let id = this.$props.testArr[val].id;

        await this.deleteData(id);
        // 更新数据
        this.handleChildEventArr();
      } else {
        // 用户点击了取消，不执行任何操作
      }
    },

    async deleteData(id) {
      try {
        let index = id;
        const response = await fetch(`http://localhost:3000/APIDATA/${index}`, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log(this.index);
          console.log("删除成功");
        } else {
          console.log(this.index);
          console.log("删除失败");
        }
      } catch (error) {
        console.error("请求出错:", error);
      }
    },

    // 编辑某行数据
    EditArr(val) {
      const GoalItem = { ...this.$props.testArr[val] };
      this.isEditMode = true;
      this.openDialog(GoalItem);
    },
    // 响应事件，当用户点击确认或取消时，将EditMode模式改为false
    handleClickDown() {
      this.isEditMode = false;
    },
    addChat() {
      // =====================================================
      // 这里在本地创建了db.json 也就是通过json-server模拟服务器 从而模拟从服务器获取数据
      //  请求数据      把数据都保存到本地
      // 创建XHR对象
      const xhr = new XMLHttpRequest();

      // 设置请求方法和URL
      xhr.open("GET", "http://localhost:3000/chatData", true);

      // 监听XHR对象的load事件
      xhr.onload = () => {
        // 检查响应状态
        if (xhr.status === 200) {
          // 将响应数据解析为JSON格式
          const data = JSON.parse(xhr.responseText);
          this.chatArr = data;
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
      this.isChat = true;
      // =====================================================
    },
    addChatClose() {
      this.isChat = false;
    },
    handleChildEvent(data) {
      // 接收子组件传递的数据
      if (data) {
        const xhr = new XMLHttpRequest();

        // 设置请求方法和URL
        xhr.open("GET", `http://localhost:3000/chatData`, true);

        // 监听XHR对象的load事件
        xhr.onload = () => {
          // 检查响应状态
          if (xhr.status === 200) {
            // 将响应数据解析为JSON格式
            const data = JSON.parse(xhr.responseText);

            // 将JSON数据赋值给Vue组件的data中的数组
            this.chatArr = data;
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
      }
    },

    handleChildEventArr() {
      this.$emit("upData");
    },
  },
  data() {
    return {
      diaLogRef: {},
      isShowBox: true,
      isEditMode: false,
      chatArr: [],
      isChat: false,
    };
  },
};
</script>

<!-- 在此处对样式进行 修改为scoped（局部生效）我引入组件被覆盖 -->
<style scoped>
.fixed-button {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 90px;
  height: 35px;
  border: none;
  border-radius: 5px;
  color: rgb(7, 193, 96);
  background-color: rgb(233, 233, 233);
}

.closeButton {
  position: fixed;
  bottom: 20px;
  left: 140px;
  width: 90px;
  height: 35px;
  border: none;
  border-radius: 5px;
  color: rgb(7, 193, 96);
  background-color: rgb(233, 233, 233);
}

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
  overflow: auto;
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
