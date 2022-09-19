<template lang="">
  <div id="app">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="name"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { ref } from "vue";
import { Toast } from "vant";
import md5 from "js-md5";

import { useIndexStore } from "@/store";
import { useRouter } from "vue-router";

export default {
  setup() {
    console.log("login");

    //路由
    const router = useRouter();

    //输入的值
    const username = ref("");
    const password = ref("");

    //store
    const indexStore = useIndexStore();

    const onSubmit = (values) => {
      let localUserInfo = indexStore.userInfo;

      //当前用户存在，则判断是否一致
      if (localUserInfo.name) {
        if (
          values.name == localUserInfo.name &&
          md5(values.password) == localUserInfo.password
        ) {
          //路由跳转
          router.push({
            path: "/", //目标路由地址
          });
        } else {
          Toast("用户名或密码错误!");
        }
      } else {
        //浏览器内部的用户不存在，则要加入新的
        let userInfo = {
          name: values.name,
          password: md5(values.password),
        };
        indexStore.setUserInfo(userInfo);

        //路由跳转
        router.push({
          path: "/", //目标路由地址
        });
      }
    };

    return {
      username,
      password,
      onSubmit,
    };
  },

  methods: {
    loadApi() {
      request({
        url: "/profile",
        data: {
          firstName: "Fred",
          lastName: "Flintstone",
        },
        method: "post",
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style>
body {
  height: 100% !important;
  background-color: #f7f8fa !important;
}

#app {
  min-height: 100%;
}
</style>
