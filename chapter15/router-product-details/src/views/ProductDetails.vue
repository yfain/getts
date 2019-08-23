<template>
  <div>
    <h1>Product details</h1>
    <ul v-if="product">
      <li>ID: {{ product.id }}</li>
      <li>Title: {{ product.title }}</li>
      <li>Price: {{ product.price }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
import { Product } from '@/product';

@Component({
  async beforeRouteEnter(to: Route, from: Route, next: Function) {
    const product = await fetchProductByID(to.params.productId);
    next((component) => component.product = product);
  },

  async beforeRouteUpdate(to: Route, from: Route, next: Function) {
    this.product = await fetchProductByID(to.params.productId);
    next();
  },
})
export default class ProductDetails extends Vue {
  private product: Product | null = null;
}

async function fetchProductByID(id: string): Promise<Product> {
  const productId = parseInt(id, 10);
  const response = await fetch('/products.json');
  const products = await response.json();
  return products.find((p) => p.id === productId);
}
</script>

<style>
  ul {
    text-align: left;
  }
</style>