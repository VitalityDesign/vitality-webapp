import { createRouter, createWebHashHistory } from "vue-router";

import { HomeFilled } from "@element-plus/icons-vue";

import IconSolution from "@/components/icons/IconSolution.vue";
import IconKnowledge from "@/components/icons/IconKnowledge.vue";
import IconTechnology from "@/components/icons/IconTechnology.vue";
import IconFunction from "@/components/icons/IconFunction.vue";
import IconSubject from "@/components/icons/IconSubject.vue";
import IconSystem from "@/components/icons/IconSystem.vue";
import IconStrategy from "@/components/icons/IconStrategy.vue";
import IconTheory from "@/components/icons/IconTheory.vue";
import IconSimulation from "@/components/icons/IconSimulation.vue";
import IconPractice from "@/components/icons/IconPractice.vue";

const routes = [
  {
    path: "/",
    meta: {
      needLogin: true,
    },
    component: () => import("@/view/layout/index.vue"),
    children: [
      {
        path: "/Home",
        name: "Home",
        icon: HomeFilled,
        component: () => import("@/view/home/index.vue"),
      },
      {
        path: "/Subject",
        name: "Subject",
        icon: IconSubject,
        component: () => import("@/view/subject/index.vue"),
      },
      {
        path: "/Knowledge",
        name: "Knowledge",
        icon: IconKnowledge,
        component: () => import("@/view/knowledge/index.vue"),
      },
      {
        path: "/Technology",
        name: "Technology",
        icon: IconTechnology,
        component: () => import("@/view/technology/index.vue"),
      },
      {
        path: "/Function",
        name: "Function",
        icon: IconFunction,
        children: [
          {
            path: "System",
            name: "System",
            icon: IconSystem,
            component: () => import("@/view/function/System.vue"),
          },
          {
            path: "Strategy",
            name: "Strategy",
            icon: IconStrategy,
            component: () => import("@/view/function/Strategy.vue"),
          },
        ],
      },
      {
        path: "/Solutions",
        name: "Solutions",
        icon: IconSolution,
        children: [
          {
            path: "Rule/Policy",
            name: "Rule/Policy",
            component: () => import("@/view/solutions/RulePolicy.vue"),
          },
          {
            path: "Performance",
            name: "Performance",
            component: () => import("@/view/solutions/Performance.vue"),
          },
        ],
      },
      {
        path: "/Theory",
        name: "Theory",
        icon: IconTheory,
        component: () => import("@/view/theory/index.vue"),
      },
      {
        path: "/Simulation",
        name: "Simulation",
        icon: IconSimulation,
        component: () => import("@/view/simulation/index.vue"),
      },
      {
        path: "/Practice",
        name: "Practice",
        icon: IconPractice,
        component: () => import("@/view/practice/index.vue"),
      },
    ], // "/children"
  }, // "/"
  {
    path: "/login",
    name: "Login",
    component: () => import("@/view/login/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { needLogin } = to.meta;
  if (needLogin) {
    const token = localStorage.getItem("access_token");
    if (token) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
