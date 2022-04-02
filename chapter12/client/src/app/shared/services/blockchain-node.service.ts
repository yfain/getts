import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { CryptoService } from './crypto.service';

const HASH_REQUIREMENT = '0000';

export interface Transaction {
  readonly sender: string;
  readonly recipient: string;
  readonly amount: number;
}

export interface Block {
  readonly hash: string;
  readonly nonce: number;
  readonly previousHash: string;
  readonly timestamp: number;
  readonly transactions: Transaction[];
}

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type WithoutHash<T> = Omit<T, 'hash'>;
export type NotMinedBlock = Omit<Block, 'hash' | 'nonce'>;

export function formatTransactions(transactions: Transaction[]): string {
  return transactions.map(t =>`${t.sender} → ${t.recipient}: $${t.amount}`).join('\n');
}

@Injectable({
  providedIn: 'root'
})
export class BlockchainNodeService {
  private _chain: Block[] = [];
  private _pendingTransactions: Transaction[] = [];
  private _isMining = false;
  
  constructor(private readonly crypto: CryptoService) {}

  initializeWith(blocks: Block[]): void {
    this._chain = [...blocks ];
  }

  async initializeWithGenesisBlock(): Promise<void> {
    const genesisBlock = await this.mineBlock({ previousHash: '0', timestamp: Date.now(), transactions: [] });
    this._chain.push(genesisBlock);
  }

  async mineBlock(block: NotMinedBlock): Promise<Block> {
    this._isMining = true;
    let hash = '';
    let nonce = 0;

    do {
      hash = await this.calculateHash({ ...block, nonce: ++nonce })
    } while (!hash.startsWith(HASH_REQUIREMENT));

    this._isMining = false;
    this._pendingTransactions = [];
    return { ...block, hash, nonce };
  }

  async mineBlockWith(transactions: Transaction[]): Promise<Block> {
    // NOTE: INTRODUCING A RANDOM DELAY FOR DEMO PURPOSES.
    // We want to randomize block's timestamp creation so the node that generates transactions
    // doesn't have an advantage since it's timestamp will always be earlier.
    await timer(500).toPromise(); // Unlike Chapter 10 version, here we use rxjs to generate the delay.

    const block = { previousHash: this.latestBlock.hash, timestamp: Date.now(), transactions };
    return this.mineBlock(block);
  }

  get isMining(): boolean {
    return this._isMining;
  }

  get chain(): Block[] {
    return [ ...this._chain ];
  }

  get chainIsEmpty(): boolean {
    return this._chain.length === 0;
  }

  get latestBlock(): Block {
    return this._chain[this._chain.length - 1];
  }

  get pendingTransactions(): Transaction[] {
    return [ ...this._pendingTransactions ];
  }

  get hasPendingTransactions(): boolean {
    return this.pendingTransactions.length > 0;
  }

  get noPendingTransactions(): boolean {
    return this.pendingTransactions.length === 0;
  }

  addTransaction(transaction: Transaction): void {
    this._pendingTransactions.push(transaction);
  }

  /**
   * Attempts to add a block into the blockchain. The rejected promise carries the reason why the block wasn't added.
   */
  async addBlock(newBlock: Block): Promise<void> {
    const errorMessagePrefix = `⚠️ Block "${newBlock.hash.slice(0, 8)}" is rejected`;

    // Find the block after which the new block should be added.
    const previousBlockIndex = this._chain.findIndex(b => b.hash === newBlock.previousHash);
    if (previousBlockIndex < 0) {
      throw new Error(`${errorMessagePrefix} - there is no block in the chain with the specified previous hash "${newBlock.previousHash.slice(0, 8)}".`);
    }

    // The current node may already have one or more blocks generated (or received from other nodes in the network),
    // after the one we attempt to add. In this case the longest chain takes precedence and the new block is rejected.
    const tail = this._chain.slice(previousBlockIndex + 1);
    if (tail.length >= 1) {
      throw new Error(`${errorMessagePrefix} - the longer tail of the current node takes precedence over the new block.`);
    }

    // Verify the hash of the new block against the hash of the previous block.
    const newBlockHash = await this.calculateHash(newBlock);
    const prevBlockHash = this._chain[previousBlockIndex].hash;
    const newBlockValid = (
      newBlockHash.startsWith(HASH_REQUIREMENT) &&
      newBlock.previousHash === prevBlockHash &&
      newBlock.hash === newBlockHash
    );
    if (!newBlockValid) {
      throw new Error(`${errorMessagePrefix} - hash verification has failed.`);
    }

    // Append the new block at the end of the chain.
    this._chain = [ ...this._chain, newBlock ];
  }

  private async calculateHash(block: WithoutHash<Block>): Promise<string> {
    const data = block.previousHash + block.timestamp + JSON.stringify(block.transactions) + block.nonce;
    return this.crypto.sha256(data);
  }
}
