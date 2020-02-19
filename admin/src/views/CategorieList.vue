<!-- 创建分类的路由组件 -->
<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="catelist">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类"></el-table-column>
      <el-table-column prop="name" label="分类列表"></el-table-column>
       <el-table-column fixed="right" label="操作" width="200">
      <template v-slot="scope">
        <el-button type="primary" size="mini" @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑</el-button>
        <el-button type="danger" size="mini" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表单对象
      catelist: []
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getList() // 获取服务器的分类列表
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    // 获取分类列表
    async getList() {
      const res = await this.$http.get('rest/categories')
      if (res.status !== 200) return this.$message.error('获取列表失败')
      this.catelist = res.data
    },
    // 删除分类
    async remove(row) {
       const isRemove = await this.$confirm(`此操作将永久删除分类 "${row.name}" , 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (isRemove !== 'confirm') return this.$notify.info('删除操作已取消')
        const res = await this.$http.delete(`rest/categories/${row._id}`) 
        if (!res.data.success) return this.$notify.error('删除失败')
        this.$notify.success('删除成功')
        this.getList()
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
