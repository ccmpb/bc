"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const HTTP_PORT = 3000;
const P2P_PORT = 6000;

const BlockChain = require('./blockchain');
var blockchain = new BlockChain();

var sockets = [];

const http = express();
http.use(bodyParser.json());

// get ledger 
http.get('/', (req, res) => {
  res.send(JSON.stringify(blockchain));
});

http.post('/node', (req, res) => {
  const peer = req.body.peer || 'http://localhost:6000';
  var ws = new WebSocket(peer);
  ws.on('open', () => p2pInit(ws));
  ws.on('error', () => {
    console.log('error connecting peer');
  });
  res.send();
});

// get list of peers/nodes
http.get('/node', (req, res) => {
  res.send(sockets.map(s => s._socket.remoteAddress + ':' + s._socket.remotePort));
});

http.listen(HTTP_PORT, () => console.log('Server listening on port: ' + HTTP_PORT));


const p2p = new WebSocket.Server({port: P2P_PORT});
p2p.on('connection', ws => p2pInit(ws)); 
console.log('Server listening websocket p2p port on: ' + P2P_PORT);

const p2pInit = (ws) => {
  sockets.push(ws);
}

// var Block = require('./block');
//
//
//
//
//
// var blockchain = new BlockChain();
//
// console.log(blockchain);
//
// blockchain.addNewBlock(new Block(
//   blockchain.getTip().head + 1,
//   new Date().getTime() / 1000,
//   '{Cain and Abel}',
//   blockchain.getTip().hash
// ));
//
// blockchain.addNewBlock(new Block(
//   blockchain.getTip().head + 1,
//   new Date().getTime() / 1000,
//   '{Adam and Eve}',
//   blockchain.getTip().hash
// ));
//
// console.log(blockchain);
