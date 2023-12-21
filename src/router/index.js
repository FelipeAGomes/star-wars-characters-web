// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import PageIndex from '../components/PageIndex.vue';
import CharacterDetails from '../components/CharacterDetails.vue';

const routes = [
  {
    path: '/',
    name: 'PageIndex',
    component: PageIndex,
  },
  {
    path: '/character/:name',
    name: 'CharacterDetails',
    component: CharacterDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
