<template>
  <main id="app">
    <h1>Blockchain node</h1>
    <aside><p>{{ status }}</p></aside>
    <section>
      <transaction-form
        :disabled="shouldDisableForm()"
        @add-transaction="addTransaction">
      </transaction-form>
    </section>
    <section>
      <pending-transactions-panel
        :transactions="transactions()"
        :disabled="shouldDisableGeneration()"
        @generate-block="generateBlock">
      </pending-transactions-panel>
    </section>
    <section>
      <blocks-panel :blocks="blocks()"></blocks-panel>
    </section>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import BlocksPanel from '@/components/BlocksPanel.vue';
import PendingTransactionsPanel from '@/components/PendingTransactionsPanel.vue';
import TransactionForm from '@/components/TransactionForm.vue';

import { Block, BlockchainNode, Transaction } from '@/lib/blockchain-node';
import { Message, MessageTypes } from '@/lib/messages';
import { WebsocketController } from '@/lib/websocket-controller';

const node = new BlockchainNode();
const server = new WebsocketController();

@Component({
  components: {
    BlocksPanel,
    PendingTransactionsPanel,
    TransactionForm
  }
})
export default class App extends Vue {
  status: string = '';

  // Note: Must be a function, Vue doesn't work with getters, i.e.: get blocks() { return node.chain; }
  blocks(): Block[] {
    return node.chain;
  }

  transactions(): Transaction[] {
    return node.pendingTransactions;
  }

  shouldDisableForm(): boolean {
    return node.isMining || node.chainIsEmpty;
  }

  shouldDisableGeneration(): boolean {
    return node.isMining || node.noPendingTransactions;
  }

  created() {
    this.updateStatus();

    server
      .connect(this.handleServerMessages.bind(this))
      .then(this.initializeBlockchainNode.bind(this));
  }

  destroyed() {
    server.disconnect();
  }

  updateStatus() {
    this.status = node.chainIsEmpty          ? '⏳ Initializing the blockchain...' :
                  node.isMining              ? '⏳ Mining a new block...' :
                  node.noPendingTransactions ? '📩 Add one or more transactions.' :
                                               `✅ Ready to mine a new block (transactions: ${node.pendingTransactions.length}).`;
  }

  async initializeBlockchainNode(): Promise<void> {
    const blocks = await server.requestLongestChain();
    if (blocks.length > 0) {
      node.initializeWith(blocks);
    } else {
      await node.initializeWithGenesisBlock();
    }
    this.updateStatus();
  }

  addTransaction(transaction: Transaction): void {
    node.addTransaction(transaction);
    this.updateStatus();
  }

  async generateBlock(): Promise<void> {
    // Let everyone in the network know that transactions need to be added to the blockchain.
    // Every node will try to generate a new block first for the provided transactions.
    server.requestNewBlock(node.pendingTransactions);
    const miningProcessIsDone = node.mineBlockWith(node.pendingTransactions);

    this.updateStatus();

    const newBlock = await miningProcessIsDone;
    this.addBlock(newBlock);
  }

  async addBlock(block: Block, notifyOthers = true): Promise<void> {
    // The addBlock() method returns a promise that is rejected if the block cannot be added
    // to the chain. Hence wrap the addBlock() call in the try / catch.
    try {
      await node.addBlock(block);
      if (notifyOthers) {
        server.announceNewBlock(block);
      }
    } catch (error) {
      console.log(error.message);
    }

    this.updateStatus();
  }

  handleServerMessages(message: Message) {
    switch (message.type) {
      case MessageTypes.GetLongestChainRequest: return this.handleGetLongestChainRequest(message);
      case MessageTypes.NewBlockRequest       : return this.handleNewBlockRequest(message);
      case MessageTypes.NewBlockAnnouncement  : return this.handleNewBlockAnnouncement(message);
      default: {
        console.log(`Received message of unknown type: "${message.type}"`);
      }
    }
  }

  handleGetLongestChainRequest(message: Message): void {
    server.send({
      type: MessageTypes.GetLongestChainResponse,
      correlationId: message.correlationId,
      payload: node.chain
    });
  }

  async handleNewBlockRequest(message: Message): Promise<void> {
    const transactions = message.payload as Transaction[];
    const miningProcessIsDone = node.mineBlockWith(transactions);

    this.updateStatus();

    const newBlock = await miningProcessIsDone;
    this.addBlock(newBlock);
  }

  handleNewBlockAnnouncement(message: Message): void {
    const newBlock = message.payload as Block;
    this.addBlock(newBlock, false);
  }
}
</script>
