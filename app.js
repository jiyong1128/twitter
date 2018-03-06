const express = require('express');
const app = express(); // creates an instance of an express application
const morgan = require('morgan')
const nunjucks = require('nunjucks');
const routes = require('./routes');
const bodyParser = require('body-parser');
const socketio = require('socket.io');

var server = app.listen('3000', () => {
    console.log('server listening');
})
var io = socketio.listen(server);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use('/', routes(io))
app.use(express.static('public'))


const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks


