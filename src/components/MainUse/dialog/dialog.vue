<template>
  <div class="diaLog">
    <el-dialog
      title="新增接口"
      :visible.sync="dialogVisible"
      width="25%"
      :showClose="false"
    >
      <el-form v-model="form" label-width="80px" ref="form" :rules="rules">
        <!-- <el-form-item label="ID:" prop="id"> -->
        <!-- 
            当处于编辑时， 该值不可修改  
           :disabled="isEditMode"
          -->

        <!-- 将id默认锁住 -->
        <!-- <el-input v-model="form.id" :disabled="isEditMode"></el-input>
        </el-form-item> -->

        <el-form-item label="Name:" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="API:" prop="api">
          <el-input v-model="form.api" @input="startApiValidation"></el-input>
        </el-form-item>

        <el-form-item label="Done:" prop="done">
          <el-select v-model="form.done" placeholder="请选择">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Method:" prop="method">
          <el-select
            v-model="form.method"
            placeholder="请选择"
            class="custom-select"
          >
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="CancelClick" class="custom-select"
          >取 消</el-button
        >
        <el-button type="primary" @click="uploadForm" :disabled="!dataValid"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import Bus from "@/Bus";
export default {
  props: {
    isEditMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    testArr: {
      type: Array,
      required: false,
      default: () => [],
    },
    deleteFn: {
      type: Boolean,
      required: true,
    },
  },

  name: "diaLog",
  data() {
    return {
      dialogVisible: false,
      form: {
        // id: "",
        name: "",
        api: "",
        done: "",
        method: "",
      },
      // 表格验证规则  不确定为什么失效
      // rules: {
      //   api: [
      //     {
      //       pattern: /^(http:\/\/|https:\/\/|www\.)/,
      //       message: "请输入以'http://'、'https://'或'www.'开头的Api",
      //       trigger: "blur",
      //     },
      //   ],
      // },

      dataValid: {
        default: false,
      },
      // 定时器
      apiValidationTimer: null,
    };
  },

  methods: {
    uploadForm() {
      this.dialogVisible = false;

      // 将按钮重置为关闭状态
      this.dataValid = false;
      // Bus.$emit("uploadForm", this.form);
      // =====================================================
      // 这里在本地创建了db.json 也就是通过json-server模拟服务器 从而模拟从服务器获取数据
      const url = " http://localhost:3000/APIDATA"; // 替换为你的请求URL
      const data = { ...this.form };

      if (!this.$props.isEditMode) {
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
      } else {
        // 发送 PATCH 请求
        const url = `http://localhost:3000/APIDATA/${this.form.id}`;
        fetch(url, {
          method: "PATCH",
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
      }

      this.$emit("clickDowned");
    },

    CancelClick() {
      this.dialogVisible = false;
      // 将按钮重置为关闭状态
      this.dataValid = false;

      this.$emit("clickDowned");
    },

    // 确定按钮的可用与否 -
    startApiValidation() {
      if (this.apiValidationTimer) {
        clearTimeout(this.apiValidationTimer); // 清除之前的定时器
      }
      this.apiValidationTimer = setTimeout(() => {
        this.validateApi();
      }, 1000); // 1秒延迟
    },
    validateApi() {
      if (
        this.form.api.startsWith("http://") ||
        this.form.api.startsWith("https://") ||
        this.form.api.startsWith("www.")
      ) {
        this.dataValid = true; // 启用按钮
      } else {
        this.dataValid = false; // 禁用按钮
        alert("请输入以http://|| https:// || www.开头的API");
      }
    },
  },
};
</script>

<style scoped>
.custom-select .el-select-dropdown {
  padding-left: 100%;
  width: 100%; /* Make the dropdown width full */
}

.el-input {
  width: 100%;
}
</style>
