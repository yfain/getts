<template>
  <div class="block">
    <div class="block__header">
      <span class="block__index">#{{ index }}</span>
      <span class="block__timestamp">{{ timestamp }}</span>
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
      <pre class="block__transactions">{{ formattedTransactions || 'No transactions' }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Transaction } from '@/lib/blockchain-node';

export default Vue.extend({
  name: 'Block',
  props: {
    index: {
      type: Number,
      required: true
    },
    block: {
      type: Object,
      required: true
    }
  },
  computed: {
    timestamp: function () {
      return new Date(this.block.timestamp).toLocaleTimeString()
    },

    formattedTransactions: function () {
      return this.block.transactions
        .map((t: Transaction) =>`${t.sender} → ${t.recipient}: $${t.amount}`)
        .join('\n');
    }
  }
});
</script>
