import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/pages/MainPage.vue';
import ImagePage from '@/pages/ImagePage.vue';
import QueryPage from '@/pages/QueryPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: MainPage, path: '/' },
  { name: 'query', component: QueryPage, path: '/search/:query' },
  { name: 'image', component: ImagePage, path: '/image/:id' },
];
const router = new VueRouter({
  routes,
});

export default router;
