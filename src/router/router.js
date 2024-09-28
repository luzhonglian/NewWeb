import { createWebHashHistory, createRouter } from "vue-router";

import Home from "@/views/Home/Home.vue";

const routes = [{ path: "/", component: Home }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//` 路由守卫
router.beforeEach((to, from, next) => {
  next();
});

export default router;
