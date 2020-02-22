<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/img/2.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img/3.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img/4.jpeg" alt="" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>
    <!-- end swiper -->
    <div class="nav-icons bg-white pt-3 mt-3  text-center text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="(item, index) in icon" :key="index">
          <i :class="['sprite', item.icon]"></i>
          <div class="py-2">{{ item.name }}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm ">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- end of nac icons -->
    <!-- 卡片组件 -->
    <!-- <m-card icon="cc-menu-circle" title="新闻资讯">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item ">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item ">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item ">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item ">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div v-for="n in 5" :key="n" class="py-2">
              <span>公告</span>
              <span>|</span>
              <span>体验服爆料丨穿上新盔甲，守护玄雍城！白起优化曝光</span>
              <span>02/14</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card> -->

    <m-list-card icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <template #items="{category}"  >
        <div v-for="(item, i) in category.newsList" :key="i" class="py-2">
          <span>[{{ item.categoryName }}]</span>
          <span>|</span>
          <span>{{ item.title }}</span>
          <span>{{ item.date }}</span>
        </div>
      </template>
      <!--//通过#items 取到 子组件slot 绑定的category数据 -->
    </m-list-card>

    <m-card icon="cc-menu-circle" title="英雄列表"></m-card>
    <m-card icon="cc-menu-circle" title="精彩视频"></m-card>
    <m-card icon="cc-menu-circle" title="图文攻略"></m-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        // 参数选项,显示小点
        pagination: {
          el: ".pagination-home"
        },
        loop: true,
        autoplay: { delay: 3000 }
      },
      icon: [
        { name: "爆料站", icon: "sprite-news" },
        { name: "故事站", icon: "sprite-1" },
        { name: "周边商城", icon: "sprite-2" },
        { name: "体验服", icon: "sprite-3" },
        { name: "新人专区", icon: "sprite-4" },
        { name: "荣耀传承", icon: "sprite-5" },
        { name: "模拟战资料库", icon: "sprite-6" },
        { name: "王者营地", icon: "sprite-7" },
        { name: "公众号", icon: "sprite-8" },
        { name: "版本介绍", icon: "sprite-9" }
      ],
      newsCats: [
        {
          name: "热门",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "热门",
            title: "体验服爆料丨穿上新盔甲，守护玄雍城！",
            date: "02/09"
          }))
        },
        {
          name: "公告",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "公告",
            title: "体验服爆料丨穿上新盔甲，守护玄雍城！",
            date: "02/09"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "新闻",
            title: "体验服爆料丨穿上新盔甲，守护玄雍城！",
            date: "02/09"
          }))
        },
        {
          name: "活动",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "活动",
            title: "体验服爆料丨穿上新盔甲，守护玄雍城！",
            date: "02/09"
          }))
        },
        {
          name: "赛事",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "赛事",
            title: "体验服爆料丨穿上新盔甲，守护玄雍城！",
            date: "02/09"
          }))
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "../assets/css/variable";

.swiper-pagination {
  text-align: right !important;
  .swiper-pagination-bullet {
    border-radius: 2px;
    margin: 0 0.35rem !important;
    background: #fff;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
      opacity: 1;
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
