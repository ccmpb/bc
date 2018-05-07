"use strict";

const chai = require('chai');
const should = chai.should();
const BlockChain = require('../src/blockchain');
const Block = require('../src/Block');

describe('Blockchain', () => {
  const bc = new BlockChain();

  it('has a genesis block', () => {
    bc.should.have.property('blockchain');
    bc.blockchain.should.be.an('array');
    bc.blockchain[0].head.should.equal(0);
  });

  describe('#getTip', () => {
    it('can get tip', () => {
      bc.getTip().head.should.equal(0);
    });
  });

  describe('#addNewBlock', () => {
    it('can add a new block', () => {
      const block = new Block(bc.getTip().head + 1, Date.now(), '{zzz}', bc.getTip().hash);
      bc.addNewBlock(block);
      bc.blockchain.should.have.lengthOf(2);
      bc.getTip().head.should.equal(1);
    });
  });

  describe('#getblockhash', () => {
    it('can get a hash', () => {
      bc.getblockhash(0);
    });
  
  });
});
