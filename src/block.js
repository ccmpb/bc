"use strict";

var CryptoJS = require("crypto-js");

class Block {

  constructor(head, timestamp, data, previousHash = null) {  
    this.head = head;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash= previousHash;
    this.hash = this.calculateHash(head, timestamp, data, previousHash);
  }

  calculateHash(head, timestamp, data, previousHash) {
    return CryptoJS.SHA256(head + previousHash + timestamp + data).toString(); 
  }
}

module.exports = Block;
