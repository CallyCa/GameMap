const express = require('express');
const app = express();
const server = require('http').createServer(app)
const bodyParser = require('body-parser');
const path = require('path');
const io = require('socket.io')(server);

const port = 3000;
const locahost = `http://localhost:${port}`

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use('/', (req, res) => {
    res.render('index');
});

let messages = [];

io.on('connection', socket => {
    console.log(`a user connected: ${socket.id}`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});

server.listen(port, () => {console.log(locahost)});
