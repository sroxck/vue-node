<!-- 创建分类的路由组件 -->
<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!--  @submit.native.prevent   submit表单的提交事件,native代表原生表单,prevent阻止默认行为 -->
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
            <!--双向数据绑定表单值到data中 -->
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
               :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuth()"
                  :show-file-list="false"
                  :on-success="res => $set(model,'avatar',res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

           <el-form-item label="背景图">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuth()"
                  :show-file-list="false"
                  :on-success="res => $set(model,'banner',res.url)"
                >
                  <img v-if="model.banner" :src="model.banner" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                 
              </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
            <!--双向数据绑定表单值到data中 -->
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              :max="9"
              v-model="model.scores.difficult"
              style="margin-top:0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              :max="9"
              v-model="model.scores.skill"
              style="margin-top:0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              :max="9"
              v-model="model.scores.attack"
              style="margin-top:0.6rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              :max="9"
              v-model="model.scores.survive"
              style="margin-top:0.6rem"
            ></el-rate>
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
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button
            size="smile"
            type="primary"
            icon="el-icon-plus"
            @click="model.skills.push({})"
            >添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col
              :md="12"
              v-for="(item, index) in model.skills"
              :key="index"
              style="margin-bottom:2rem"
            >
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                 :action="$http.defaults.baseURL + '/upload'"
                  :headers="getAuth()"
                  :show-file-list="false"
                  :on-success="res => $set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                 
              </el-form-item>

             
              <el-form-item label="描述">
                <el-input v-model="item.discription" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button
            size="smile"
            type="primary"
            icon="el-icon-plus"
            @click="model.partners.push({})"
            >添加英雄</el-button
          >
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col
              :md="12"
              v-for="(item, index) in model.partners"
              :key="index"
              style="margin-bottom:2rem"
            >
              <el-form-item label="名称">
                <el-select  filterable v-model="item.hero" >
                  <el-option v-for='hero in heroes' :key="hero._id" :value='hero._id' :label="hero.name"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.discription" type="textarea"></el-input>
              </el-form-item>
              
              <el-form-item>
                <el-button type="danger" @click="model.partners.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item>
        <el-button type="primary" native-type="submit" style="margin-top:1rem"
          >保存</el-button
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
        avatar: "",
        scores: {
          difficult: 0
        },
        skills:[],
        partners:[],
      },
      categories: [],
      items: [],
      heroes:[]
      
    }
  },
  computed: {
    myHeaders() {
      const token = localStorage.token
      return {Authorization: token}
    }
  }
  ,
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.fetchCategories()
    this.id && this.fetch()
    this.fetchItems()
    this.fetchHero()
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
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },
    // 获取父级选项
    async fetchParent() {
      const res = await this.$http.get(`rest/heroes`);
      this.parents = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },
    async fetchHero() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
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
