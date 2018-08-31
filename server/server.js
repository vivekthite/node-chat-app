const path = require('path');
const express = require('express')
const http = require('http');
const socketIo = require('socket.io');

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
    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to chat',
        createdAt: new Date().getTime()
    });

    //message from admin ... if new user joins 
    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage',(message) => {
        message['createdAt'] = new Date();
        //io.emit('newMessage',message);
        socket.broadcast.emit('newMessage',message);
    });
});

server.listen(PORT,() => {
    console.info('Server started at '+PORT);
});


 



