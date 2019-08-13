<template>
  <div>
    <h2>Pending transactions</h2>
    <pre class="pending-transactions__list">{{ formattedTransactions() || 'No pending transactions yet.' }}</pre>
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Transaction } from '@/lib/blockchain-node';

@Component
export default class PendingTransactionsPanel extends Vue {
  @Prop(Boolean) readonly disabled: boolean;
  @Prop({ type: Array, required: true }) readonly transactions: Transaction[];

  formattedTransactions(): string {
    return this.transactions
      .map((t: any) =>`${t.sender} → ${t.recipient}: $${t.amount}`)
      .join('\n');
  }

  generateBlock(): void {
    this.$emit('generate-block');
  }
}
</script>
