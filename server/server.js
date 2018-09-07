const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

//express conf
const app = express(); 
app.use(express.static(publicPath));
const server = http.createServer(app);
const io = socketIo(server);
const users = new Users();

io.on('connection',(socket) => {
    //console.log('socket',socket);
    //console.log('client',socket.client);    
    console.log('New client connected');

    socket.on('disconnect' , () => {
        console.log('New client disconnected');
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList',users.getUserNames(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',user.name+' has left'));
            //socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name+' has joined'));
        }
        
    });

    socket.on('join',(params,callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            return callback('Provide the values for user name and room to join');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserNames(params.room));
        //socket.leave('roomName');
        //io.to('roomName').emit
        //socket.broadcast.to('roomName').emit

         //message from Admin .. saying welcome to chat
        socket.emit('newMessage',generateMessage('Admin','Welcome to Chat'));

        //message from admin ... if new user joins 
        socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',params.name+' has joined'));

        callback();
    });
    
   

    //invoked when new message is created by user
    socket.on('createMessage',(message,callback) => {
        //message['createdAt'] = new Date();
        //io.emit('newMessage',message);
        console.log(message);
        //socket.broadcast.emit('newMessage',generateMessage(message.from,message.text));
        var user = users.getUser(socket.id);
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
        }        
        callback();
    });

    socket.on('createLocationMessage',(coords) => {
        var user = users.getUser(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude , coords.longitude));
        }        
    });
});

server.listen(PORT,() => {
    console.info('Server started at '+PORT);
});


 



