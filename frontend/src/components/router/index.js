import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/loginSuccess",
    name: "loginSuccess",
    meta: {
      title: "loginSuccess",
    },
    component: () => import("@/components/loginSuccess/loginSuccess.vue"),
  },{
    path: "/signOut",
    name: "signOut",
    meta: {
      title: "signOut",
    },
    component: () => import("@/components/signOut/signOut.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "Dashboard",
    },
    component: () => import("@/components/dashboard/Dashboard.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "Home",
        },
        component: () => import("@/components/home/Home.vue"),
      },
      {
        path: "/uploadImg",
        name: "uploadImg",
        meta: {
          title: "Upload Image",
        },
        component: () => import("@/components/uploadImg/UploadImg.vue"),
      },
      {
        path: "/query",
        name: "query",
        meta: {
          title: "Query",
        },
        component: () => import("@/components/query/Query.vue"),
      },{
        path: "/allimages",
        name: "allimages",
        meta: {
          title: "allimages",
        },
        component: () => import("@/components/allimages/allimages.vue"),
      },{
        path: "/findByImage",
        name: "findByImage",
        meta: {
          title: "findByImage",
        },
        component: () => import("@/components/findByImage/findByImage.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if(to.path == '/home' || to.path == '/login' || to.path == '/loginSuccess'){
    next();
  }else if(to.path == '/signOut'){
    Vue.prototype.$jwt=undefined
    router.push({path:'/home'});
  }else{
    if(Vue.prototype.$jwt == undefined){
      alert("please login first!");
      router.push({path:'/home'});
    }else{
        next();
    }
  }
//   console.log(Vue.prototype.$jwt);
});

export default router;
