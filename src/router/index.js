import { createWebHistory, createRouter } from "vue-router";

import Home from "../components/templates/home.vue";
import Stack from "../components/templates/stack.vue";
import Project from "../components/templates/project.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/stack",
        name: "Stack",
        component: Stack,
    },
    {
        path: "/project/:id",
        name: 'Project',
        component: Project,
        props: true
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    },
});

export default router;