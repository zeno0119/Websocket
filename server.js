'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const path = require('path');
var fs = require("fs");
var number = 0;
var Number = 0;

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

var format = {
  "room":{
      "id":null,
      "seed":null
  },
  "object":null,
  "objective":null,
  "cordinate":{
      "x":null,
      "y":null,
      "z":null
  }
};

wss.on('connection', function(ws){
  console.log('Client connected');
  ws.on('message',function(Event){
    var event = JSON.parse(Event);
    if(event.objective == "start"){
      number++;
      if(number == Number){
        sendmessage(Event);
        number = 0;
      }
    }else if(event.objectibe == "ready"){
      Number = event.object;
      number = 0;
    }else{
      ws.send(Event);
      sendmessage(Event);
      console.log(event);
      console.log(event.cordinate);
      console.log(event.objective);
      if(event.objective == "cordinate"){
        console.log(event.cordinate.x + "," + event.cordinate.y + "," + event.cordinate.z);
      } 
    }
  });
  ws.on('close', function(){
    console.log('Client disconnected');
  });
});

setInterval(function(){
  wss.clients.forEach(function(client){
    client.send(new Date().toTimeString());
  });
}, 1000);

function sendmessage(message){
  wss.clients.forEach(function(client){
    client.send(message);
  });
}