<!-- 创建分类的路由组件 -->
<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!--  @submit.native.prevent   submit表单的提交事件,native代表原生表单,prevent阻止默认行为 -->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
        <!--双向数据绑定表单值到data中 -->
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
        <!--双向数据绑定表单值到data中 -->
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
        <!--双向数据绑定表单值到data中 -->
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button
        ><!--  native-type="submit" 按钮类型是原生提交按钮 -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      // 表单对象
      model: {
        name: "",
        avatar: ""
      },
      categories: []
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    // 创建分类,像服务器发送请求
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/heroes", this.model);
      }

      if (res.status !== 200) return this.$message.error("设置分类失败");
      this.$router.push("/heroes/list");
      this.$message.success("保存成功");
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 获取父级选项
    async fetchParent() {
      const res = await this.$http.get(`rest/heroes`);
      this.parents = res.data;
    }
  },
  watch: {
    $route() {
      this.model = {};
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
