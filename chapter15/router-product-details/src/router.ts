import Vue from 'vue';
import Router from 'vue-router';
import ProductDetails from './views/ProductDetails.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/products/:productId',
      component: ProductDetails,
    },
  ],
});
