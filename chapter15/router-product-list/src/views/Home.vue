<template>
  <div class="home">
    <h1>Products</h1>
    <ul id="prod">
       <li v-for="product in products" 
           v-bind:key="product.id"
           v-bind:class="{selected: product === selectedProduct}"
           @click = "onSelect(product)">
          {{ product.title }} 
       </li>
    </ul>
  </div>
</template>

<style>

.home {
  display: flex;
  flex-direction: column;
}
  ul {
    text-align: left;
    display: inline-block;
    align-self: start;
  }

  .selected {
    background-color: lightblue
  }
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {Product} from '@/product';

@Component
export default class Home extends Vue {

  private products: Product[] = [];

  private selectedProduct: Product | null = null;

  public created() {
    fetch('/products.json')
    .then((response) => response.json())
    .then((json) => {
      this.products = json;
    },
    (error) => {
       console.error('Error loading products.json:', error);
    });
  }

  private onSelect(prod: Product): void {
    this.selectedProduct = prod;
  }
}
</script>
