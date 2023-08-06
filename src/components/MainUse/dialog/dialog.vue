<template>
  <div class="diaLog">
    <el-dialog
      title="新增接口"
      :visible.sync="dialogVisible"
      width="25%"
      :showClose="false"
    >
      <el-form :model="form" label-width="80px" ref="form">
        <el-form-item label="ID:" prop="id" :rules="rules.id">
          <el-input v-model="form.id"></el-input>
        </el-form-item>

        <el-form-item label="Name:" prop="name" :rules="rules.name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="API:" prop="api" :rules="rules.api">
          <el-input v-model="form.api"></el-input>
        </el-form-item>

        <el-form-item label="Done:" prop="done" :rules="rules.done">
          <el-select v-model="form.done" placeholder="请选择">
            <el-option label="true" value="true"></el-option>
            <el-option label="false" value="false"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="Method:" prop="method" :rules="rules.method">
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
        <el-button
          type="danger"
          @click="dialogVisible = false"
          class="custom-select"
          >取 消</el-button
        >
        <el-button type="primary" @click="uploadForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Bus from "@/Bus";
export default {
  name: "diaLog",
  data() {
    return {
      dialogVisible: false,
      form: {
        id: "",
        name: "",
        api: "",
        done: "",
        method: "",
      },
      rules: {
        id: [{ required: true, message: "请输入ID", trigger: "blur" }],
        name: [{ required: true, message: "请输入Name", trigger: "blur" }],
        api: [{ required: true, message: "请输入API", trigger: "blur" }],
        done: [{ required: true, message: "请选择Done", trigger: "change" }],
        method: [
          { required: true, message: "请选择Method", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    uploadForm() {
      this.dialogVisible = false;

      Bus.$emit("uploadForm", this.form);
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
