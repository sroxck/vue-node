<!-- 创建分类的路由组件 -->
<template>
  <div>
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save"> <!--  @submit.native.prevent   submit表单的提交事件,native代表原生表单,prevent阻止默认行为 -->
      <el-form-item label="名称">
        <el-input v-model="model.title"></el-input> <!--双向数据绑定表单值到data中 -->
      </el-form-item>
       <el-form-item label="广告">
          <el-button size="smile" type="primary" icon="el-icon-plus" @click="model.items.push({})">添加广告</el-button>
          <el-row type="flex" style="flex-wrap:wrap" >
            <el-col :md="12" v-for="(item,index) in model.items" :key="index" style="margin-bottom:2rem;border-left:2px dashed skyblue;margin:20px">
              <el-form-item label="跳转连接(URL)" style="margin-bottom:2rem">
                <el-input v-model="item.url"></el-input>
              </el-form-item>
              <el-form-item label="轮播图"  style="margin-bottom:2rem">
                 <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuth()"
                  :show-file-list="false"
                  :on-success="res => $set(item,'image' ,res.url)"
                >
                  <img v-if="item.image" :src="item.image" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item >
              <el-form-item>
                <el-button type="text" @click="model.items.splice(index,1)" style="margin-left:350px">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
      model: {
        items:[]
      },
      // 父级选项
      parents: []
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
        res = await this.$http.put(`rest/ads/${this.id}`, this.model)
      }else {
        res = await this.$http.post('rest/ads', this.model)
      }
       
       if (res.status !== 200) return this.$message.error('设置分类失败') 
       this.$router.push('/ads/list')
       this.$message.success('保存成功')
    },
    async fetch () {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      this.model = Object.assign({},this.model,res.data)
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
