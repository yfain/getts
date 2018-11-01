import { Blockchain } from '../lib/bc_transactions';

(async function main(): Promise<void> {
    console.log('⏳ Initializing the blockchain, creating the genesis block...');
    
    const bc = new Blockchain();
    await bc.createGenesisBlock();
    
    bc.createTransaction({ sender: 'John', recipient: 'Kate', amount: 50 });
    bc.createTransaction({ sender: 'Kate', recipient: 'Mike', amount: 10 });
    
    await bc.minePendingTransactions();

    bc.createTransaction({ sender: 'Alex', recipient: 'Rosa', amount: 15 });
    bc.createTransaction({ sender: 'Gina', recipient: 'Rick', amount: 60 });
    
    await bc.minePendingTransactions();
    
    console.log(JSON.stringify(bc, null, 2));
})();
