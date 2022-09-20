import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import path from "path";

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // @代替src
    },
  },
  server: {
    //跨域，在axios中封装
    host: "192.168.102.202",
    port: 5419,
    open: false, //自动打开浏览器
    // base: "./ ", //生产环境路径
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      "/api": {
        target: "http://192.168.102.202:5601/api", // 后端服务实际地址
        changeOrigin: false, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
};
