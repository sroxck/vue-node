<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/img/2.jpeg" alt=""/>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img/3.jpeg" alt=""/>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img/4.jpeg" alt=""/>
      </swiper-slide>
      <div class="swiper-pagination pagination-home" slot="pagination"></div>
    </swiper>
    <!-- end swiper -->
    <div class="nav-icons bg-white pt-3 mt-3  text-center text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for = "(item,index) in icon" :key="index">
          <i :class="['sprite',item.icon]"></i>
          <div class="py-2">{{item.name}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm ">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- end of nac icons -->
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        // 参数选项,显示小点
        pagination:{
          el:".pagination-home"
        },
        loop:true,
        autoplay:{delay:3000}
      },
      icon:[
        {name:'爆料站',icon:'sprite-news'},
        {name:'故事站',icon:'sprite-1'},
        {name:'周边商城',icon:'sprite-2'},
        {name:'体验服',icon:'sprite-3'},
        {name:'新人专区',icon:'sprite-4'},
        {name:'荣耀传承',icon:'sprite-5'},
        {name:'模拟战资料库',icon:'sprite-6'},
        {name:'王者营地',icon:'sprite-7'},
        {name:'公众号',icon:'sprite-8'},
        {name:'版本介绍',icon:'sprite-9'},
      ]
    };
  }
};
</script>
<style lang="scss">
@import '../assets/css/variable';

  .swiper-pagination {
    text-align:right !important;
    .swiper-pagination-bullet {
      border-radius: 2px;
      margin: 0 0.35rem  !important;
      background: #fff;
      opacity: 1;
      &.swiper-pagination-bullet-active {
        background: map-get($colors,'info');
        opacity: 1;
      }
    }
  }
 .nav-icons {
   border-top: 1px solid $border-color;
   border-bottom: 1px solid $border-color;
   .nav-item {
     width: 25%;
     border-right:1px solid $border-color;
     &:nth-child(4n) {
       border-right: none
     }
   }
 }
</style>
