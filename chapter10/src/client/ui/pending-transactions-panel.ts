import { html, TemplateResult } from '../../../node_modules/lit-html/lit-html.js';
import { BlockchainNode } from '../lib/blockchain-node.js';
import { Callback, formatTransactions, Renderable, UI } from './common.js';

export class PendingTransactionsPanel implements Renderable<Readonly<BlockchainNode>> {
  constructor(readonly requestRendering: Callback) {}

  render(node: Readonly<BlockchainNode>): TemplateResult {
    const shouldDisableGenerate = node.noPendingTransactions || node.isMining;
    const formattedTransactions = node.hasPendingTransactions
      ? formatTransactions(node.pendingTransactions)
      : 'No pending transactions yet.';

    return html`
      <h2>Pending transactions</h2>
      <pre class="pending-transactions__list">${formattedTransactions}</pre>
      <div class="pending-transactions__form">${UI.button('GENERATE BLOCK', shouldDisableGenerate)}</form>
      <div class="clear"></div>
    `;
  }
}
