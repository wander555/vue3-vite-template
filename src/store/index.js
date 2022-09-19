import { defineStore } from "pinia";

/**
 *  1. 定义并导出容器
 *   参数1： 容器的 ID , 必须唯一， 将来 Pinia 会把所有的容器挂载到跟容器
 *   参数2： 选项对象
 *   返回值： 一个函数, 调用得到容器实例
 */

export const useIndexStore = defineStore("index", {
  /**
   *  类似于组件的data, 用来存储全局状态
   *  1. 必须是函数，这样是为了在服务端渲染的时候避免交叉请求导致的数据状态渲染
   *  2. 必须是箭头函数, 这是为了更好的 TS 类型推导
   */
  state: () => {
    return {
      userInfo: {
        name: "",
        password: "",
      },
    };
  },

  /**
   *  类似于组件的computed, 用来封装计算属性, 有缓存的功能
   */
  getters: {
    // 接受一个可选参数 state 即 当前ID为index的Store实例  也可以用this 拿到 上面的state的状态值
    // countTotal(state) {
    //   return state.count * state.quantity;
    // },
  },

  /**
   * 类似于组件的 methods 封装业务逻辑, 修改state
   * 通过 this  拿到上面 state的状态值
   */
  actions: {
    setUserInfo(val) {
      this.userInfo = val;
    },
  },

  // 使用该插件，开启数据缓存
  persist: {
    //这里存储默认使用的是session
    enabled: false,
    strategies: [
      {
        //key的名称
        key: "user_info",
        //更改默认存储，我更改为localStorage
        storage: localStorage,
        // 可以选择哪些进入local存储，这样就不用全部都进去存储了
        // 默认是全部进去存储
        paths: ["userInfo"],
      },
    ],
  },
});
