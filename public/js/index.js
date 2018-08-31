const socket = io();
socket.on('connect',function () {
    console.log('Connected to server');

    socket.emit('createEmail',{
        to: 'xyz@example.com',
        text: 'Hellllllllllllooooooooo ....',
        createdAt: 123
    });

    socket.emit('createMessage',{
        to: 'xyz@example.com',
        text: 'Hellllllllllllooooooooo ....'        
    });
});

socket.on('disconnect' , function () {
    console.log('Disconnected from server');
});

socket.on('newEmail' , function (email) {
    console.log('New Email',email);
});

socket.on('newMessage' , function (message) {
    console.log('New message',message);
});

