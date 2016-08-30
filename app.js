'use strict';

var express = require('express');
var path = require('path');
var config = require('./config.json');

require('node-jsx').install();

var port = config.port;

var app = new express();

var afterStartAction = () => {

  console.log('Server start at port', port);

};

app.use(express.static(path.join(__dirname, './')));
app.set('views', path.join(__dirname, './'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {

  res.render('index.ejs', {});

});

app.listen(port, afterStartAction);