const express = require('express');
const app = express(); // creates an instance of an express application
const morgan = require('morgan')


app.use(morgan('dev'))

app.get('/news', (req, res, next) => {
    res.status(200).send('hello world!')
})



app.listen('3000', () => {
    console.log('server listening');
})
