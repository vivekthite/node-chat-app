const socket = io();
socket.on('connect',function () {
    console.log('Connected to server');   
});

socket.on('disconnect' , function () {
    console.log('Disconnected from server');
});

socket.on('newMessage' , function (message) {
    console.log('New message',message);
    var li = jQuery('<li></li>');
    li.text(message.from + ':' +message.text);
    jQuery('#messages').append(li);
});

/* 
socket.emit('createMessage',{
    from: 'abc',
    text: 'Hello'
},function(res){
    console.log('Got it : '+res);
});

 */

 jQuery('#message-form').on('submit',function(event) {
    event.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(res){
        console.log('Got it : ',res);
    })
});

