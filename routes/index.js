//module.exports = router;
const express = require('express');
const tweetBank = require('../tweetBank');

module.exports = function(io) {
const router = express.Router();
// could use one line instead: const router = require('express').Router();

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  console.log(tweets);
  res.render( 'index', { tweets: tweets, showForm: true } );
});

router.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  io.sockets.emit('newTweet', { name: name, content: text });
  res.redirect('/');
});

router.get('/users/:name', function(req, res) {
  let name = req.params.name;
  let list = tweetBank.find( {name: name} );
  console.log(name);
  console.log(list);

  res.render( 'index', { tweets: list, showForm: true });
});

router.get('/tweets/:id', function(req, res) {
  let id = Number(req.params.id);
  let list = tweetBank.find({ uniqueId: id });
  res.render('index', {tweets: list});
});

 // ...
  return router;
};
