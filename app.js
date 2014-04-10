'use strict';

var express = require('express'),
  app = express(),
  http = require('http'),
  querystring = require('querystring'),
  server = http.createServer(app),
  io = require('socket.io').listen(server),
  clientIo = require('socket.io-client');

// SOCKET IO

io.set('transports', ['xhr-polling']);
io.set('polling duration', 10);

// SOCKET CLIENT

var clientSocket = clientIo.connect(process.env.REMOTE_HOST, {
  reconnect: true
});

clientSocket.on('connect', function() {
  console.log('Connected to ' + process.env.REMOTE_HOST);
});

clientSocket.on('postData', function(incomingData) {

  var data = querystring.stringify(incomingData.data);

  var options = {
    host: process.env.LOCAL_HOST,
    port: process.env.LOCAL_PORT,
    path: process.env.LOCAL_PATH,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
      console.log('body: ' + chunk);
    });
  });

  req.write(data);
  req.end();
});

// EXPRESSJS

app.use(express.json());
app.use(express.urlencoded());

app.post('/hook', function(req, res) {
  io.sockets.emit('postData', {
    data: req.body || {}
  });
  res.send('ok');
});

var server = server.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port %d', server.address().port);
});