"use strict";

const sinon = require('sinon');
const chai = require('chai');
const should = chai.should();
const Block = require('../src/block');
var CryptoJS = require("crypto-js");

describe('Block', () => {
  const block = new Block(0, 311731200, "{in the begining...}");

  it('has properties', () => {
    block.should.have.property('head');
    block.should.have.property('timestamp');
    block.should.have.property('data');
    block.should.have.property('previousHash');
    block.should.have.property('hash');
  });

  describe('#calculateHash', () => {
    it('has a calculated hash', () => {
      block.hash.should.not.be.null;
    });

    it('has a default previous hash', () => {
      should.not.exist(block.previousHash);
    });

    it('gets hashed', () => {
      block.hash.should.equal(block.calculateHash(block.head, block.timestamp, block.data, block.previousHash));
    });

    it('uses SHA256', () => {
      let spy = sinon.spy(CryptoJS, 'SHA256');   
      block.calculateHash(block.head, block.timestamp, block.previousHash);
      spy.calledOnce.should.be.true;
    });
  });
});
