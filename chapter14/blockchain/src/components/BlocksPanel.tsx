import React from 'react';
import { Block, Transaction } from '../lib/blockchain-node';

type BlocksPanelProps = {
  blocks: Block[]
};

const BlocksPanel: React.FC<BlocksPanelProps> = ({ blocks }) => {
  return (
    <>
      <h2>Current blocks</h2>
      <div className="blocks">
        <div className="blocks__ribbon">
          {blocks.map((b, i) => <BlockComponent key={b.hash} index={i} block={b}></BlockComponent>)}
        </div>
        <div className="blocks__overlay"></div>
      </div>
    </>
  );
}

const BlockComponent: React.FC<{ index: number, block: Block }> = ({ index, block }) => {
  const formattedTransactions = formatTransactions(block.transactions);
  const timestamp = new Date(block.timestamp).toLocaleTimeString();

  return (
    <div className="block">
      <div className="block__header">
        <span className="block__index">#{index}</span>
        <span className="block__timestamp">{timestamp}</span>
      </div>
      <div className="block__hashes">
        <div className="block__hash">
          <div className="block__label">← PREV HASH</div>
          <div className="block__hash-value">{block.previousHash}</div>
        </div>
        <div className="block__hash">
          <div className="block__label">THIS HASH</div>
          <div className="block__hash-value">{block.hash}</div>
        </div>
      </div>
      <div>
        <div className="block__label">TRANSACTIONS</div>
        <pre className="block__transactions">{formattedTransactions || 'No transactions'}</pre>
      </div>
    </div>
  );
}

function formatTransactions(transactions: Transaction[]): string {
  return transactions.map(t =>`${t.sender} → ${t.recipient}: $${t.amount}`).join('\n');
}

export default BlocksPanel;
