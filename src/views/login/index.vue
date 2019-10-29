<template>
  <div class="login-main" :style="mainstyle">
    <div class="login-container">
      <div><h1 style="color:white">Godper</h1></div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="60px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="adminname">
          <el-input
            v-model.trim="ruleForm.adminname"
            autocomplete="off"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model.trim="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >确定</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        adminname: "",
        password: ""
      },
      rules: {
        adminname: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {

    ...mapState([
      "token",
      "userinfo",
      "userstatus"
    ]),

    getheight() {
      var winHeight;
      if (window.innerHeight) {
        winHeight = window.innerHeight;
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight;
      }
      return winHeight;
    },
    mainstyle() {
      return { height: this.getheight + "px" };
    }
  },
  methods: {
    ...mapMutations(["userDataSave"]),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
       if (valid) {
          var request = {
            method: "post",
            url: "admin/login",
            data: this.ruleForm
          };
          this.axios(request)
            .then(response => {
              //操作成功
              if (response.status < 30000) {
                this.userDataSave(response.data);
                this.$message.success(response.msg);
                this.$router.push({ path: `/home` })
              }
            })
            .catch(error => {
              //请求失败
              this.$message.warning("有点问题");
            });
        } else {
          this.$message.warning("请输入正确数据");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
  },
  mounted() {}
};
</script>

<style>
.login-main {
  widows: 100%;
  height: auto;
  background-color: #2d3a4b;
  text-align: center;
}
.login-container {
  padding: 12% 0;
  margin: auto;
  width: 50%;
}
</style>