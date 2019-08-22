<template>
  <div id="app">
    <div id="nav">
      <ul>
        <li v-for="product in products"
            v-bind:key="product.id">
          <router-link v-bind:to="'/products/' + product.id">
            {{ product.title }}
          </router-link>
        </li>
      </ul>
      <p>Click on a product to see details</p>
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
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
