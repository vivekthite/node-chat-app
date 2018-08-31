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
    
    socket.emit('newEmail',{
        from: 'abc@org.com',
        text: 'Hello ....',
        receivedAt: 123
    });

    socket.on('createEmail',(email) => {
        console.log('Create email',email);
    });

    socket.emit('newMessage',{
        from: 'abc@org.com',
        text: 'Hello ....',
        createdAt: 123
    });

    socket.on('createMessage',(message) => {
        message['createdAt'] = new Date();
        console.log('Create message',message);
    });
});

server.listen(PORT,() => {
    console.info('Server started at '+PORT);
});


 



