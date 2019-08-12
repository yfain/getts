<template>
  <div>
    <h2>Current blocks</h2>
    <div class="blocks">
      <div class="blocks__ribbon">
        <block v-for="(b, i) in blocks"
               :key="b.hash"
               :index="i"
               :block="b">
        </block>
      </div>
      <div class="blocks__overlay"></div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Block from './Block.vue';

export default Vue.extend({
  name: 'BlocksPanel',
  components: {
    Block
  },
  props: {
    blocks: {
      type: Array,
      required: true
    }
  }
});
</script>
