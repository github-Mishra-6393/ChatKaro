// Steps
/* 
 we are going to create a http server in express js and used socket.io to create a real time chat app;
 1. we will import express, http, path and socket.io(npm i socket.io);
 2. creat an express app and getting port form process.env.PORT if there is no port in env we will use default port of 800. then we creat a server and lesten it..
 3. use a staticfile middleware that will get file from public folder and create a rout that will send index.html file in responce.
 4. now we set socket.io -- we creat a variabale io and in this variable we connect socket.io with server, by calling socket.io(serverName that is server here), then we use on function to stablish connection--
 io.on('connection', (socket)=>{})

//   connecting it with html file--
 we will connect socket.io/socket.io.js file using script tag 
 <script src="socket.io/socket.io.js"></script>
 it must be call before another js file- now we import io function in clint.js file and our connection will be stablished.
 const socket = io(); // we call io function in socket variable in client.js file 
*/
// STEP ==> 1
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 800;
const server = http.createServer(app); //CREATING SERVER

server.listen(PORT, () => { // LISTINING SERVER
    console.log(`Server is running at http//localhost:${PORT}`);
})
// STEP ===> 2 
app.use(express.static('public')); // USING MIDDLE WARE
// USING BOOTSTRAP
app.use('/css', express.static(path.join('node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join('node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join('node_modules/jquery/dist')));

app.get('/', (req, res) => { // CREATING ROUT
    res.sendFile(`${__dirname}/index.html`);
})

// STEP ===> 3
// socket io setup

const io = require('socket.io')(server) // IMPORING SOCKET.IO AND CONNECTING IT WITH SERVER
io.on('connection', (socket) => {
    console.log('connected');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    })
})