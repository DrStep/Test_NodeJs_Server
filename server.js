/**
 * Created by step on 15.09.14.
 */
var express = require('express');
var http = require('http');
var path = require('path');
var url = require('url');
var apiRequest = require('./apiRequest');

var app = express();
/*app.set('port', process.env.PORT || 8080    );
app.enable('trust proxy');
app.set('json spaces', 2);

app.get('/', apiRequest);

var server = app.listen(app.get('port'), function() {
    console.log('Listening on port %d', server.address().port);
});*/

apiRequest();