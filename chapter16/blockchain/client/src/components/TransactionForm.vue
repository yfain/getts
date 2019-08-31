<template>
  <div>
    <h2>New transaction</h2>
    <form class="add-transaction-form" @submit.prevent="handleFormSubmit">
      <input
        type="text"
        name="sender"
        placeholder="Sender"
        autoComplete="off"
        v-model.trim="formValue.sender"
        :disabled="disabled">

      <span class="hidden-xs">→</span>

      <input
        type="text"
        name="recipient"
        placeholder="Recipient"
        autoComplete="off"
        :disabled="disabled"
        v-model.trim="formValue.recipient">

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        :disabled="disabled"
        v-model.number="formValue.amount">

      <button type="submit"
              class="ripple"
              :disabled="!isValid() || disabled">
        ADD TRANSACTION
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Transaction } from '../lib/blockchain-node';

@Component
export default class TransactionForm extends Vue {

  @Prop(Boolean) readonly disabled: boolean;
  
  formValue: Transaction = this.defaultFormValue();

  isValid() {
    return (
      this.formValue.sender &&
      this.formValue.recipient &&
      this.formValue.amount > 0
    );
  }

  handleFormSubmit() {
      this.$emit('add-transaction', { ...this.formValue });

      // Reset the form
      this.formValue = this.defaultFormValue();
  }

  private defaultFormValue(): Transaction {
    return {
      sender: '',
      recipient: '',
      amount: 0
    };
  }
}
</script>
