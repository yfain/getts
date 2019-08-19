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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Block } from '@/lib/blockchain-node';
import BlockComponent from './Block.vue';

@Component({
  components: {
    Block: BlockComponent
  }
})
export default class BlocksPanel extends Vue {
  @Prop({ type: Array, required: true }) readonly blocks: Block[];
}
</script>
