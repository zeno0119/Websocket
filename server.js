'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', function(ws){
  console.log('Client connected');
  ws.on('close', function(){
    console.log('Client disconnected')
  });
});

setInterval(function(){
  wss.clients.forEach(function(client){
    client.send(new Date().toTimeString());
  });
}, 1000);
