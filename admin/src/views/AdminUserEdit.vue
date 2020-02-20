<!-- 创建分类的路由组件 -->
<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save"> <!--  @submit.native.prevent   submit表单的提交事件,native代表原生表单,prevent阻止默认行为 -->
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input> <!--双向数据绑定表单值到data中 -->
      </el-form-item>
       <el-form-item label="密码">
        <el-input  type="password" v-model="model.password"></el-input> <!--双向数据绑定表单值到data中 -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button><!--  native-type="submit" 按钮类型是原生提交按钮 -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      // 表单对象
      model: {},
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    
    this.id && this.fetch()
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // 创建分类,像服务器发送请求
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/admin_users/${this.id}`, this.model)
      }else {
        res = await this.$http.post('rest/admin_users', this.model)
      }
       
       if (res.status !== 200) return this.$message.error('设置失败') 
       this.$router.push('/admin_users/list')
       this.$message.success('保存成功')
    },
    async fetch () {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    },
  },
  watch: {
    $route () {
      this.model = {}
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
