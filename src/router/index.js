import auth from "@/router/auth";
import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "@/views/Inicio.vue";

// import store from "@/store";

Vue.use(VueRouter);
// requireAuth = for Users
function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
}

const routes = [
  {
    path: "/",
    name: "Inicio",
    component: Inicio,
    props: true
  },
  {
    path: "/admin",
    name: "admin",
    props: true,
    component: () =>
      import(/* webpackChunkName: "Admin" */ "../views/admin/Admin.vue"),
    beforeEnter: requireAuth
  },
  {
    path: "/viudas",
    name: "viudas",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "Viudas" */ "../views/viudas/Index.vue"
      ),
    beforeEnter: requireAuth
  },
  {
    path: "/viudas/:id",
    name: "detalleViuda",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "DetallesViuda" */ "../views/viudas/Detalles.vue"
      ),
    beforeEnter: requireAuth
  },
  {
    path: "/viuda/:id",
    name: "viuda",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "Viuda" */ "../views/Viuda.vue"
      ),
    beforeEnter: requireAuth
  },
  {
    path: "/perfil",
    name: "perfil",
    component: () =>
      import(/* webPackChunkName: "Perfil" */ "../views/Perfil"),
    beforeEnter: requireAuth
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webPackChunkName: "Login" */ "../views/Login.vue")
  },
  {
    path: "/registrarse",
    name: "registrarse",
    component: () =>
      import(/* webPackChunkName: "Registrarse" */ "../views/Registrarse.vue")
  },
  {
    path: "/logout",
    beforeEnter(to, from, next) {
      auth.logout();
      next("/");
    }
  },
  {
    path: "*",
    name: "notfound",
    props: true,
    component: () =>
      import(/* webpackChunkName: "clases" */ "../views/NotFound")
  }
];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "studia-active-link",
  routes
});

export default router;
