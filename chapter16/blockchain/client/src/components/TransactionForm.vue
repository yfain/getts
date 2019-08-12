<template>
  <div>
    <h2>New transaction</h2>
    <form class="add-transaction-form" @submit.prevent="handleFormSubmit">
      <input
        type="text"
        name="sender"
        placeholder="Sender"
        autoComplete="off"
        v-model.trim="sender"
        :disabled="disabled">

      <span class="hidden-xs">→</span>

      <input
        type="text"
        name="recipient"
        placeholder="Recipient"
        autoComplete="off"
        :disabled="disabled"
        v-model.trim="recipient">

      <input
        type="number"
        name="amount"
        placeholder="Amount"
        :disabled="disabled"
        v-model.number="amount">

      <button type="submit"
              class="ripple"
              :disabled="!isValid || disabled">
        ADD TRANSACTION
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TransactionForm',

  props: {
    disabled: Boolean
  },

  data: function () {
    return {
      sender: '',
      recipient: '',
      amount: 0
    };
  },

  computed: {
    isValid: function () {
      return this.sender && this.recipient && this.amount > 0;
    }
  },

  methods: {
    handleFormSubmit() {
      if (this.isValid) {
        this.$emit('add-transaction', {
          sender: this.sender,
          recipient: this.recipient,
          amount: this.amount
        });

        // Reset form:
        this.sender = '';
        this.recipient = '';
        this.amount = 0;
      }
    }
  }
});
</script>
