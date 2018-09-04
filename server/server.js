const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

//express conf
const app = express(); 
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection',(socket) => {
    //console.log('socket',socket);
    //console.log('client',socket.client);    
    console.log('New client connected');

    socket.on('disconnect' , () => {
        console.log('New client disconnected');
    });
    
    //message from Admin .. saying welcome to chat
    socket.emit('newMessage',generateMessage('Admin','Welcome to Chat'));

    //message from admin ... if new user joins 
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    //invoked when new message is created by user
    socket.on('createMessage',(message,callback) => {
        //message['createdAt'] = new Date();
        //io.emit('newMessage',message);
        console.log(message);
        //socket.broadcast.emit('newMessage',generateMessage(message.from,message.text));
        io.emit('newMessage',generateMessage(message.from,message.text));
        callback('This is from server');
    });

    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude , coords.longitude));
    });
});

server.listen(PORT,() => {
    console.info('Server started at '+PORT);
});


 



