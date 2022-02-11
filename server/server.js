const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

require('dotenv').config();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('public'));

//IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');


const port = process.env.PORT||'3000';

//ESCUCHAR PETICIONES:
server.listen(port, '0.0.0.0', ()=>{
    console.log('Escuchando puerto: ', port);
})