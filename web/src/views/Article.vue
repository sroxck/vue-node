<!-- 文章组件 -->
<template>
  <div v-if="model" class="wenz">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-dot "></div>
      <strong class="flex-1 ml-2 text-info slh">{{ model.title }}</strong>
      <div class="text-grey fs-sm">2020/2/23</div>
    </div>
    <div v-html="model.body" class="px-3 body"></div>
    <div class="px-3 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont  icon-dot"></i>
        <strong class="text-info fs-lg ml-2 mt-2">相关资讯</strong>
      </div>
      <router-link class="py-1 mt-2" :to="`/articles/${item._id}`" tag="div" v-for="item in model.related" :key="item._id">{{item.title}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      model: null
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getArticles();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    async getArticles() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    }
  },
  watch:{
    id(){
      this.getArticles()
    }
  }
};
</script>
<style lang="scss">
/* @import url(); 引入css类 */
.wenz {  
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    
  }
  .slh {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
}
</style>
