<template lang="">
  <div>
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <!-- 给tabbar--route属性  然后给每一项to属性就可以路由跳转了 -->
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item replace icon="home-o">表单</van-tabbar-item>
      <van-tabbar-item replace icon="search">列表</van-tabbar-item>
      <van-tabbar-item replace icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const active = ref(0);
    return { active };
  },
  mounted() {
    //手动加载第一个router
    this.onChange(0);
  },

  methods: {
    //tab切换，加载不同的router
    onChange(index) {
      const routerArray = ["/1", "/2", "/3"];
      this.$router.push(routerArray[index]);
    },
  },
};
</script>
<style lang=""></style>
