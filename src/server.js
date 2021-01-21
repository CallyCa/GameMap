const express = require('express');
const app = express();
const server = require('http').createServer(app)
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;
const locahost = `http://localhost:${port}`

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/public', express.static(path.join(__dirname,'public')))
app.set('views', path.join(__dirname, 'public/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

server.listen(port, () => {console.log(locahost)});