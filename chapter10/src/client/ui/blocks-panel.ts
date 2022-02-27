import { repeat } from '../../../node_modules/lit-html/directives/repeat.js';
import { html, TemplateResult } from '../../../node_modules/lit-html/lit-html.js';
import { Block } from '../lib/blockchain-node.js';
import { Callback, formatTransactions, Renderable } from './common.js';

export class BlocksPanel implements Renderable<Readonly<Block[]>> {
  constructor(readonly requestRendering: Callback) {}

  render(blocks: Readonly<Block[]>): TemplateResult {
    return html`
      <h2>Current blocks</h2>
      <div class="blocks">
        <div class="blocks__ribbon">${repeat(blocks, (b: Block) => b.hash, this.singleBlockCard)}</div>
        <div class="blocks__overlay"></div>
      </div>
    `;
  }

  private readonly singleBlockCard = (block: Block, index: number): TemplateResult => {
    const formattedTransactions: string = formatTransactions(block.transactions);
    const timestamp: string = new Date(block.timestamp).toLocaleTimeString();

    return html`
      <div class="block">
        <div class="block__header">
          <span class="block__index">#${index}</span>
          <span class="block__timestamp">${timestamp}</span>
        </div>
        <div class="block__hashes">
          <div class="block__hash">
            <div class="block__label">← PREV HASH</div>
            <div class="block__hash-value">${block.previousHash}</div>
          </div>
          <div class="block__hash">
            <div class="block__label">THIS HASH</div>
            <div class="block__hash-value">${block.hash}</div>
          </div>
        </div>
        <div>
          <div class="block__label">TRANSACTIONS</div>
          <pre class="block__transactions">${formattedTransactions}</pre>
        </div>
      </div>
    `;
  };
}
