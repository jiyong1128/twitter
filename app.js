const express = require('express');
const app = express(); // creates an instance of an express application
const morgan = require('morgan')
const nunjucks = require('nunjucks');
const routes = require('./routes');


app.use(morgan('dev'))
app.use('/', routes)
app.use(express.static('public'))

//var locals = {
//    title: 'An Example',
//    people: [
//        { name: 'Gandalf'},
//        { name: 'Frodo' },
//        { name: 'Hermione'}
//    ]
//};

const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];

nunjucks.configure('views', {noCache: true});
//nunjucks.render('index.html', locals, (err, output) => {
//    if (err) console.error(err)
//    console.log(output);
//});
app.set('view engine', 'html'); // have res.render work with html files
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks

//app.get('/news', (req, res, next) => {
//    res.status(200).render( 'index', {title: 'Hall of Fame', people: people} );
//})

app.listen('3000', () => {
    console.log('server listening');
})
