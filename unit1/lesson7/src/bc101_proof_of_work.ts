import * as crypto from 'crypto';

class Block {
  readonly nonce: number;
  readonly hash: string;

  constructor (
    readonly index: number,
    readonly previousHash: string,
    readonly timestamp: number,
    readonly data: string
  ) {
    const { nonce, hash } = this.mine();
    this.nonce = nonce;
    this.hash = hash;
  }

  private calculateHash(nonce: number): string {
    const data = this.index + this.previousHash + this.timestamp + this.data + nonce;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  private mine(): { nonce: number, hash: string } {
    let hash: string;
    let nonce = 0;

    do {
      hash = this.calculateHash(++nonce);
    } while (hash.startsWith('0000') === false);

    return { nonce, hash };
  }
};

class Blockchain {
  private readonly chain: Block[] = [];

  private get latestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  constructor() {
    // Create the genesis block.
    this.chain.push(new Block(0, '0', Date.now(), 'Genesis block'));
  }

  addBlock(data: string): void {
    const block = new Block(
      this.latestBlock.index + 1,
      this.latestBlock.hash,
      Date.now(),
      data
    );

    this.chain.push(block);
  }
}

console.log('Initializing the blockchain, creating the genesis block...');
const blockchain = new Blockchain();

console.log('Mining block #1...');
blockchain.addBlock('First block');

console.log('Mining block #2...');
blockchain.addBlock('Second block');

console.log(JSON.stringify(blockchain, null, 2));
