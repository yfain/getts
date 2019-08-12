<template>
  <div>
    <h2>Pending transactions</h2>
    <pre class="pending-transactions__list">{{ formattedTransactions || 'No pending transactions yet.' }}</pre>
    <div class="pending-transactions__form">
      <button class="ripple"
              type="button"
              :disabled="disabled"
              @click="generateBlock()">
        GENERATE BLOCK
      </button>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Transaction } from '@/lib/blockchain-node';

export default Vue.extend({
  name: 'PendingTransactionsPanel',
  props: {
    disabled: Boolean,
    transactions: {
      type: Array,
      required: true
    }
  },
  computed: {
    formattedTransactions: function () {
      return this.transactions
        .map((t: any) =>`${t.sender} → ${t.recipient}: $${t.amount}`)
        .join('\n');
    }
  },
  methods: {
    generateBlock() {
      this.$emit('generate-block');
    }
  }
});
</script>
