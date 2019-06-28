const express = require('express');
var app = express();

const http = require('http').createServer(app)
var io = require('socket.io')(http);

app.get('/',function(req,res,next){
    res.sendFile(__dirname + '/index.html');
})

io.on('connection',function(socket){
    
    //console.log('Yay! a user connected!');
    socket.on('disconnect', function(){
        var msg = 'A User Disconnected, You continue...';
        io.emit('aUserDisconnected',msg);
    });
    socket.on('messageEvent',function(message){
        console.log('message:',message);
        socket.broadcast.emit('messageReady',message);
    })
    socket.on('userTyping',function(message){
        console.log(message);
        socket.broadcast.emit('typing',message);
    })
})

http.listen(3000,function(err){
    if(err)
        throw err;
    console.log('Runnign at http://localhost:3000');
})