import { Component } from '@angular/core';
import { Message, MessageTypes } from './shared/messages';
import { Block, BlockchainNodeService, formatTransactions, Transaction, WebsocketService } from './shared/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private readonly server: WebsocketService,
    readonly node: BlockchainNodeService
  ) {
    this.server.messageReceived.subscribe(message => this.handleServerMessages(message));
    this.initializeBlockchain();
  }

  get statusLine(): string {
    return (
      this.node.chainIsEmpty          ? '⏳ Initializing the blockchain...' :
      this.node.isMining              ? '⏳ Mining a new block...' :
      this.node.noPendingTransactions ? '📩 Add one or more transactions.' :
                                        '✅ Ready to mine a new block.'
    );
  }

  get formattedTransactions() {
    return this.node.hasPendingTransactions
      ? formatTransactions(this.node.pendingTransactions)
      : 'No pending transactions yet.';
  }

  private async initializeBlockchain() {
    const blocks = await this.server.requestLongestChain();
    if (blocks.length > 0) {
      this.node.initializeWith(blocks);
    } else {
      await this.node.initializeWithGenesisBlock();
    }
  }

  async generateBlock(): Promise<void> {
    // Let everyone in the network know about transactions need to be added to the blockchain.
    // Every node will try to generate a new block first for the provided transactions.
    this.server.requestNewBlock(this.node.pendingTransactions);
    const miningProcessIsDone = this.node.mineBlockWith(this.node.pendingTransactions);

    const newBlock = await miningProcessIsDone;
    this.addBlock(newBlock);
  };

  private async addBlock(block: Block, notifyOthers = true): Promise<void> {
    // The addBlock() method returns a promise that is rejected if the block cannot be added
    // to the chain. Hence wrap the addBlock() call in the try / catch.
    try {
      await this.node.addBlock(block);
      if (notifyOthers) {
        this.server.announceNewBlock(block);
      }
    } catch (error) {
      console.log(error.message);
    }
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

  private handleGetLongestChainRequest(message: Message): void {
    this.server.send({
      type: MessageTypes.GetLongestChainResponse,
      correlationId: message.correlationId,
      payload: this.node.chain
    });
  }

  private async handleNewBlockRequest(message: Message): Promise<void> {
    const transactions = message.payload as Transaction[];
    const newBlock = await this.node.mineBlockWith(transactions);
    this.addBlock(newBlock);
  }

  private async handleNewBlockAnnouncement(message: Message): Promise<void> {
    const newBlock = message.payload as Block;
    this.addBlock(newBlock, false);
  }
}
