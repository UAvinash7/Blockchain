const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(_version, _timestamp, _transaction, _previousHash)
    {
        this.version = _version;
        this.timestamp = _timestamp;
        this.transaction = _transaction;
        this.previousHash = _previousHash;
        this.currentHash = this.calculateHash();

    }
    //calculate HASH based on all information.
    calculateHash() {
        return SHA256(this.version + this.previousHash + this.timestamp + JSON.stringify(this.transaction)).toString();
    }
}
//Blockchain class
class Blockchain {
    constructor()
    {
        this.chain = [this.createGenesisBlock()];
    }
    //create first block
    createGenesisBlock()
    {
        let date_now = (new Date()).toISOString().replace("T", " ");
        return new Block(0, date_now, "Genesis Block", "0000-0000");

    }

    getLatestBlock()
    {
        return this.chain[this.chain.length -1];
    }
    //Add new block
    addNewBlock(newBlock)
    {
        newBlock.previousHash = this.getLatestBlock().currentHash;
        newBlock.currentHash = newBlock.calculateHash();
        this.chain.push(newBlock);

    }
}

//create a coin

let testCoin = new Blockchain();
testCoin.addNewBlock( new Block(1,(new Date()).toISOString().replace("T", " "), {a: 44, b: 65, c: 23}))
testCoin.addNewBlock( new Block(2,(new Date()).toISOString().replace("T", " "), {b: 10, x: 1, d: 5}))
testCoin.addNewBlock( new Block(3,(new Date()).toISOString().replace("T", " "), {r: 3, n: 33, c: 2}))
testCoin.addNewBlock( new Block(4,(new Date()).toISOString().replace("T", " "), {e: 444, b: 3, m: 4}))

console.log(JSON.stringify(testCoin));