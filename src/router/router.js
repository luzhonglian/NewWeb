import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  { path: "/", component: () => import("@/views/Home/Home.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//` 路由守卫
router.beforeEach((to, from, next) => {
  next();
});

export default router;
