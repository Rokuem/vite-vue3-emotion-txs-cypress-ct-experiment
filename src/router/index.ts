import { createWebHashHistory, createRouter } from "vue-router";
import { RootPage } from "../pages/root/index";
import { LoginPage } from "../pages/login/index";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: RootPage,
    },
    {
      path: "/login",
      component: LoginPage,
    },
  ],
});
