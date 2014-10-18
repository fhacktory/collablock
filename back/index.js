'use strict';

var path = require('path');

var express = require('express');
var serveStatic = require('serve-static');


var app = express();

app.use(serveStatic(path.join(__dirname, '..', 'front')));

app.listen(8080);
