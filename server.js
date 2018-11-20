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

var format = {
  "object":null,
  "objective":null,
  "cordinate":{
      "x":null,
      "y":null,
      "z":null
  },
  "rotation":{
    "x":null,
    "y":null,
    "z":null
  }
};

wss.on('connection', function(ws){
  console.log('Client connected');
  ws.on('message',function(Event){
    var event = JSON.parse(Event);
    console.log(event);
    ws.send(Event);
  });
  ws.on('close', function(){
    console.log('Client disconnected');
  });
});