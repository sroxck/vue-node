<!-- 卡片组件 -->
<template>
  <div class="card p-3 mt-3 bg-white">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i> <!--头部的小图片 必传 在使用<m-card icon=xxx>标签的时候通过属性传递过来</m-card>-->
      <div class="fs-xl flex-1 px-2">{{ title }}</div><!-- 卡片的大标题 必传 -->
      <i class="iconfont icon-dot"></i><!-- 后面默认是三个小点--> 
    </div>
    <div class="card-body pt-3"> <!-- 卡片主题内容-->
      <slot></slot><!--插槽 主题的内容在<m-card>标签中传递过来 配合m-list-card使用最佳 -->
    </div>
  </div>
</template>

<script>
export default {
  props: { // 接收父组件传递过来的值 一般形式是props:[title,icon]
    title: { type: String, required: true },//这里规定传递过来的类型必须为字符串,是必传字段
    icon: { type: String, required: true }
  }
};
</script>
<style lang="scss">
@import "../assets/css/variable";
/* @import url(); 引入css类 */
.card {
  .card-header {
    border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>
