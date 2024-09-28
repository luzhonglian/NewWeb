import { createApp } from "vue";
import "./style.css";
import "./style/global.scss";

import App from "./App.vue";
const app = createApp(App);

import router from "./router/router";
app.use(router);

import { createPinia } from "pinia";
const pinia = createPinia();
app.use(pinia);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
app.use(ElementPlus, {
  locale: zhCn,
});

import Echart from "@/components/Echart.vue";
app.component("Echart", Echart);

app.mount("#app");
