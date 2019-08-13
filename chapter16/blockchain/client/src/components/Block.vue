<template>
  <div class="block">
    <div class="block__header">
      <span class="block__index">#{{ index }}</span>
      <span class="block__timestamp">{{ timestamp() }}</span>
    </div>
    <div class="block__hashes">
      <div class="block__hash">
        <div class="block__label">← PREV HASH</div>
        <div class="block__hash-value">{{ block.previousHash }}</div>
      </div>
      <div class="block__hash">
        <div class="block__label">THIS HASH</div>
        <div class="block__hash-value">{{ block.hash }}</div>
      </div>
    </div>
    <div>
      <div class="block__label">TRANSACTIONS</div>
      <pre class="block__transactions">{{ formattedTransactions() || 'No transactions' }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Block as ChainBlock, Transaction } from '@/lib/blockchain-node';

@Component
export default class Block extends Vue {
  @Prop(Number) readonly index: number;

  @Prop({ type: Object, required: true }) readonly block: ChainBlock;

  timestamp() {
    return new Date(this.block.timestamp).toLocaleTimeString();
  }

  formattedTransactions(): string {
    return this.block.transactions
      .map((t: Transaction) =>`${t.sender} → ${t.recipient}: $${t.amount}`)
      .join('\n');
  }
}
</script>
