<template>
  <div id="app">
    <div id="nav">
      <template v-for="(product, index) in products">
        <router-link
          v-bind:key="product.id"
          v-bind:to="'/products/' + product.id">
          {{ product.title }}
        </router-link>
        <span
          v-bind:key="product.id + '|'"
          v-if="index !== products.length - 1">
          &nbsp;|&nbsp;
        </span>
      </template>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Product } from '@/product';

@Component
export default class App extends Vue {
  private products: Product[] = [];

  private created() {
    fetch('/products.json')
      .then((response) => response.json())
      .then(
        (data) => this.products = data,
        (error) => console.log('Error loading products.json:', error),
      );
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
