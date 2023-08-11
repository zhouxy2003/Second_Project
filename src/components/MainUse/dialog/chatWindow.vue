<template>
  <div>
    <div class="card">
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
        <p>Let We Talk</p>
        <div></div>
      </div>

      <div class="card__content">
        <ul v-for="ca in chatArr" :key="ca.id">
          <li class="chat_li">
            <div class="timeMess">
              <p><span class="green box"></span>{{ ca.timeMessage }}</p>
            </div>
            <div class="user_Mess">
              <p>🧑‍🚀{{ ca.user_message }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="inputBox">
        <textarea type="text" placeholder="🧑‍🚀 请输入内容..."></textarea>
        <button class="btn" @click="sendChat">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chatWindow",
  props: ["chatArr"],
  data() {
    return {};
  },
  methods: {
    sendChat() {
      const text = document.querySelector("textarea");
      const t = new Date();
      let year = t.getFullYear();
      let month = t.getMonth() + 1;
      let date = t.getDate();
      let hour = t.getHours().toString().padStart(2, "0");
      let min = t.getMinutes().toString().padStart(2, "0");
      let seconds = t.getSeconds().toString().padStart(2, "0");
      let str = `${year}/${month}/${date}/${hour}:${min}:${seconds}`;
      let textValue = text.value;

      // =====================================================
      // 这里在本地创建了db.json 也就是通过json-server模拟服务器 从而模拟从服务器获取数据
      const url = " http://localhost:3000/chatData"; // 替换为你的请求URL
      const data = {
        timeMessage: str,
        user_message: textValue,
      }; // 替换为你要发送的数据

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error: " + response.status);
          }
        })
        .then((responseData) => {
          console.log("Response:", responseData);
          // 处理服务器响应的逻辑
          this.$emit("child-event", true);
        })
        .catch((error) => {
          console.error("Error:", error);
          // 处理错误的逻辑
        });
    },
  },
};
</script>

<style scoped>
.card {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  position: absolute;
  background-color: #f8fbfe;
  border-radius: 8px;
  z-index: 1;
  overflow: hidden;
  box-shadow: 10px 10px 20px #b9b9b9, -10px -10px 20px #ffffff;
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

.card__content {
  width: 90%;
  height: 60%;
  margin-left: 5%;
  margin-top: 5%;
  overflow: scroll;

  box-shadow: 4px 4px 8px #b9b9b9, -4px -4px 8px skyblue;
}

.inputBox {
  width: 90%;
  height: 20%;
  margin-left: 5%;
  margin-top: 1%;
  box-shadow: 4px 4px 8px skyblue, 4px 4px 8px #b9b9b9;
  /*border: 1px solid #000; */
}

textarea {
  width: 100%;
  height: 70%;
  resize: none;
  font-size: 16px;
  border: none;
}

textarea:focus {
  outline: none;
}

.btn {
  float: right;
  margin-right: 20px;
  width: 90px;
  height: 35px;
  border: none;
  border-radius: 5px;
  color: rgb(7, 193, 96);
  background-color: rgb(233, 233, 233);
}

.chat_li {
  width: 100%;
  height: 60px;
  margin-top: 2%;
  /* //border: 1px solid #000; */
}

.timeMess {
  width: 100%;
  /* //border: 1px solid #000; height: 50%; */
}

.user_Mess {
  width: 100%;
  /* //border: 1px solid #000; height: 50%; */
}

.chat_li p {
  float: left;
  margin-left: 9px;
}

.chat_li span {
  margin-right: 4px;
}
</style>
