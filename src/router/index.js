import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// import store from "./../store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// check if InvalidLoginClode
// router.beforeEach((to, from, next) => {
//   if (store.getters.invalidLoginCodeStatus) {
//     next({ name: "InvalidLoginClode" });
//   } else {
//     next({ name: store.getters.userHomePage });
//   }
// });

export default router;
