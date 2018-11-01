import { Blockchain, Block } from '../lib/bc_transactions.js';

enum Status {
  Initialization = '⏳ Initializing the blockchain, creating the genesis block...',
  AddTransaction = '💸 Add one or more transactions.',
  ReadyToMine    = '✅ Ready to mine a new block.',
  MineInProgress = '⏳ Mining a new block...'
}

const amountEl              = document.getElementById('amount') as HTMLInputElement;
const blocksEl              = document.getElementById('blocks') as HTMLDivElement;
const confirmBtn            = document.getElementById('confirm') as HTMLButtonElement;
const pendingTransactionsEl = document.getElementById('pending-transactions') as HTMLPreElement;
const recipientEl           = document.getElementById('recipient') as HTMLInputElement;
const senderEl              = document.getElementById('sender') as HTMLInputElement;
const statusEl              = document.getElementById('status') as HTMLParagraphElement;
const transferBtn           = document.getElementById('transfer') as HTMLButtonElement;

(async function main(): Promise<void> {
  // Subscribe to events.
  transferBtn.addEventListener('click', addTransaction);
  confirmBtn.addEventListener('click', mineBlock);

  statusEl.textContent = Status.Initialization;

  const blockchain = new Blockchain();
  await blockchain.createGenesisBlock();
  blocksEl.innerHTML = blockchain.chain.map((b, i) => generateBlockHtml(b, i)).join('');

  statusEl.textContent = Status.AddTransaction;
  toggleState(true, false);

  function addTransaction() {
    blockchain.createTransaction({
      sender: senderEl.value,
      recipient: recipientEl.value,
      amount: parseInt(amountEl.value),
    });

    toggleState(false, false);
    pendingTransactionsEl.textContent = blockchain.pendingTransactions.map(t =>
      `${t.sender} → ${t.recipient}: $${t.amount}`).join('\n');
    statusEl.textContent = Status.ReadyToMine;
    
    // Reset form's value.
    senderEl.value = '';
    recipientEl.value = '';
    amountEl.value = '0';
  }

  async function mineBlock() {
    statusEl.textContent = Status.MineInProgress;
    toggleState(true, true);
    await blockchain.minePendingTransactions();

    pendingTransactionsEl.textContent = 'No pending transactions at the moment.';
    statusEl.textContent = Status.AddTransaction;
    blocksEl.innerHTML = blockchain.chain.map((b, i) => generateBlockHtml(b, i)).join('');
    toggleState(true, false);
  }
})();

function toggleState(confirmation: boolean, transferForm: boolean): void {
  transferBtn.disabled = amountEl.disabled = senderEl.disabled = recipientEl.disabled = transferForm;
  confirmBtn.disabled = confirmation;
}


function generateBlockHtml(block: Block, index: number) {
  return `
    <div class="block">
      <span class="block__index">#${index}</span>
      <span class="block__timestamp">${new Date(block.timestamp).toLocaleTimeString()}</span>
      <div class="prev-hash">
        <div class="hash-title">← PREV HASH</div>
        <div class="hash-value">${block.previousHash}</div>
      </div>
      <div class="this-hash">
        <div class="hash-title">THIS HASH</div>
        <div class="hash-value">${block.hash}</div>
      </div>
      <div class="block__transactions">
        <div class="hash-title">TRANSACTIONS</div>
        <pre class="transactions-value">${block.transactions.map(t => `${t.sender} → ${t.recipient} - $${t.amount}`)}</pre>
      </div>
    </div>
  `;
}