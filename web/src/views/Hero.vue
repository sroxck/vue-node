<!-- 英雄详情 -->
<template>
  <div v-if="model" class="page">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" alt="" />
      <div class="px-3 flex-1 text-white">
        <span class="mr-3">王者荣耀</span>
        <span>攻略站</span>
      </div>
      <router-link tag="div" to="/" class="text-white fs-sm d-flex"
        >返回首页<span class="fs-xxl ml-2">&gt;</span></router-link
      >
    </div>
    <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
      <div class="info text-white p-3  h-100">
        <div class="d-flex flex-column jc-end h-100">
          <div class="text-grey">{{ model.title }}</div>
          <div class="my-2 fs-xxl">{{ model.name }}</div>
          <div>{{ model.categories.map(v => v.name).join("/") }}</div>
          <div v-if="model.scores" class="d-flex ai-center">
            <span>难度</span>
            <span class="skill bg-primary m-2">{{
              model.scores.difficult
            }}</span>
            <span>技能</span>
            <span class="skill bg-info m-2">{{ model.scores.skill }}</span>
            <span>攻击</span>
            <span class="skill bg-dark m-2">{{ model.scores.attack }}</span>
            <span>生存</span>
            <span class="skill bg-grey m-2">{{ model.scores.survive }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- end of top  -->
    <div class="container">
      <div class="px-3 bg-white">
        <div class="nav d-flex pt-3 pb-2 jc-around border-bottom">
          <div class="nav-item " :class="{active:toggleIndex===0}" @click="toggle(0)">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item" :class="{active:toggleIndex===1}" @click="toggle(1)">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper ref="swiperRef" @slide-change="()=>{toggleIndex=$refs.swiperRef.swiper.realIndex}">
        <swiper-slide >
          <div>
            <div class="p-3 bg-white border-bottom d-flex ">
              <router-link
                tag="button"
                to="/"
                class="flex-1 btn btn-lg d-flex ai-center jc-center "
              >
                <i class="iconfont icon-dot mr-1"></i>
                英雄介绍视频
              </router-link>

              <router-link
                tag="button"
                to="/"
                class="flex-1 ml-2 btn btn-lg d-flex ai-center jc-center"
              >
                <i class="iconfont icon-dot mr-1"></i>
                一图识英雄
              </router-link>
            </div>
            <div class="jn bg-white py-3 px-3 ">
              <div class="d-flex jc-around">
                <img
                  :src="item.icon"
                  v-for="(item, i) in model.skills"
                  @click="currentSkillIndex = i"
                  :key="item._id"
                  width="60"
                  height="60"
                  :class="{ active: currentSkillIndex === i }"
                  class="icon "
                />
              </div>
              <div v-if="currentSkill" class="">
                <h3>{{ currentSkill.name }}</h3>
                <div>{{ currentSkill.discription }}</div>
              </div>
              <div class="border-bottom mt-3"></div>
            </div>
            <m-card icon="none" title="出装推荐" class="itemICO">
              <div class="sf">
                <div class="fs-xl mb-3">顺风出装</div>
                <div class="d-flex jc-around text-center">
                  <div v-for="item in model.items1" :key="item.name">
                    <img :src="item.icon" class="icon" alt="" width="40" />
                    <div>{{ item.name }}</div>
                  </div>
                </div>
              </div>
              <div class="nf mt-3 border-top pt-3" >
                <div class="fs-xl mb-3 ">逆风出装</div>
                <div class="d-flex jc-around text-center">
                  <div v-for="item in model.items2" :key="item.name">
                    <img :src="item.icon" class="icon" alt="" width="40" />
                    <div>{{ item.name }}</div>
                  </div>
                </div>
              </div>
            </m-card>
            <m-card icon="none" title="使用技巧">
              <p class="m-0">{{ model.usageTips }}</p>
            </m-card>
            <m-card icon="none" title="对抗技巧">
              <p class="m-0">{{ model.battleTips }}</p>
            </m-card>
            <m-card icon="none" title="团站思路">
              <p class="m-0">{{ model.teamTips }}</p>
            </m-card>
            <m-card icon="none" title="英雄关系">
              <div class="">最佳搭档</div>
              <div v-for="item in model.partners" :key="item.name" class="d-flex pt-3">
                <img :src="item.hero.avatar" alt="" height="40">
                <p class="flex-1 ml-3 m-0">{{item.discription}}</p>
              </div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div><h1>还没做呢</h1></div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: { id: { required: true } },
  data() {
    return {
      model: null, //所有页面都依赖这个对象的数据显示
      currentSkillIndex: 0,
      toggleIndex:0
    };
  },
  methods: {
    async getData() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
    },
    toggle(n){
      this.$refs.swiperRef.swiper.slideTo(n)
    }
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillIndex];
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getData();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
@import "../assets/css/_variable.scss";
.page .top {
  height: 50vw;
  background: #fff no-repeat top center;
  background-size: auto 100%;
}
.page .skill {
  display: inline-block;
  text-align: center;
  width: 1rem;
  height: 1rem;
  font-size: 0.7692rem;
  line-height: 1rem;
  text-align: center;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.page .info {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
}
.jn {
  img.icon {
    border: 3px solid map-get($colors, "white");
    &.active {
      border-color: map-get($colors, "primary");
    }
    border-radius: 45%;
  }
}
.itemICO {
  img.icon {
    border-radius: 50%;
  }
}
</style>
