var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {
    socket.on('Client-send-data', (data) => {
        console.log(data);
        io.sockets.emit('Server-send-data', data);
    });

    socket.on('disconnect', () => {
        console.log(socket.id + " vua thoat xong");  
    });
});

server.listen(port);
