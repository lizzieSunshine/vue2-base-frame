import Layout_Main from "@/layout/layout.header.vue";
import Layout_Main_Full from "@/layout/layout.full.vue";

export default [
  {
    path: "",
    name: "main",
    component: Layout_Main,
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    path: "",
    name: "mainFull",
    component: Layout_Main_Full,
    children: [
      {
        path: '/index1',
        name: 'index1',
        component: () => import('@/views/home/full.vue')
      }
    ]
  }
];
