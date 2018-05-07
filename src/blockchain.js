"use strict";

var Block = require('./block');

class BlockChain {

  constructor() {
    this.blockchain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, 311731200, "{in the begining...}");
  }

  getTip() {
    return this.blockchain[this.blockchain.length - 1];
  }

  addNewBlock(block) {
    if (this.isValidBlock(block, this.getTip())) {
      this.blockchain.push(block);
    } else {
      console.warn('Block not added.')
    }
  }

  isValidBlock(newBlock, previousBlock) {
    if (newBlock.head !== previousBlock.head + 1) {
      console.warn('Head mismatch.');
      return false;
    }

    if (newBlock.previousHash !== previousBlock.hash) {
      console.warn('Hash mismatch.');
      return false;
    }
    return true;
  }

  isValid() {
    for (let i = 1; i < this.blockchain.length; i++) {
      const current = this.blockchain[i] ;
      const prev = this.blockchain[i - 1];

      if (!this.isValidBlock(current, prev)) {
        console.warn('blockchain corrupt.');
        return false;
      }
    }
    return true;
  }

  getblockhash(head) {
    if (this.blockchain[head]) {
      return this.blockchain[head].hash;
    }
  }
}

module.exports = BlockChain;
