var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');

var route = require('./routes/index');
var account = require('./routes/account');

// Setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', route);
app.use('/account', account);

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

io.on('connection', function(socket) {
    socket.emit('cliConn', { timestamp: new Date(), body: 'Connection made to server with socket.io' });
    socket.on('cliMsg', function(data){
        socket.emit('svrMsg', { timestamp: new Date(), body: 'Message received: ' + data.body });
    });

});