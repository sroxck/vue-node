<!--  -->
<template>
  <div class="login">
    <el-card header="请先登录" class="login-card">
      <el-form :model="model" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('ruleForm')" >登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      rules: {
        username: [
           { required: true, message: '请输入用户名', trigger: 'blur' },
           { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password:[
           { required: true, message: '请输入密码', trigger: 'blur' },
           { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    submit(refName) { // 登录功能
      this.$refs[refName].validate(async valid=>{
        if (valid) {
          const res = await this.$http.post('login',this.model)
          localStorage.token = res.data.token
          this.$router.push('/')
          this.$message.success('登录成功')
        }
      })
    }
  }
};
</script>
<style>
/* @import url(); 引入css类 */
.login-card {
  width: 35rem;
  margin: 8rem auto;
}
.el-card__header {
  background-color: coral !important ;
}
</style>
