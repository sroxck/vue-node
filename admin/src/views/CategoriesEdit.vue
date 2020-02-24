<!-- 创建分类的路由组件 -->
<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save"> <!--  @submit.native.prevent   submit表单的提交事件,native代表原生表单,prevent阻止默认行为 -->
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id" ></el-option>
        </el-select> <!--双向数据绑定表单值到data中 -->
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input> <!--双向数据绑定表单值到data中 -->
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
      // 父级选项
      parents: []
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.fetchParent()
    this.id && this.fetch()
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // 创建分类,像服务器发送请求
    async save () {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/categories/${this.id}`, this.model)
      }else {
        res = await this.$http.post('rest/categories', this.model)
      }
       
       if (res.status !== 200) return this.$message.error('设置分类失败') 
       this.$router.push('/categories/list')
       this.$message.success('保存成功')
    },
    async fetch () {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    // 获取父级选项
    async fetchParent () {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    },
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
