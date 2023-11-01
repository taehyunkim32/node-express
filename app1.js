var http = require('http');
var express = require('express');
var fs = require('fs');
var socketio = require('socket.io');

var app = express();
var server = http.createServer(app);

var io = socketio();
io.attach(server);

app.get('/', function (request, response) {
    fs.readFile('client.html', function (error, data) {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end(data);
    });
});
/*
server.listen(56789, '192.168.219.103', function () {
    console.log('Server running at http://localhost:3000');
});
*/
io.sockets.on('connection', function (socket) {
    // message 이벤트 :이벤트받음
    socket.on('message', function (data) {
        // 클라이언트에 message 이벤트 발생시킴 :이벤트보냄
        io.sockets.emit('message', data);
    });
});
/*
// DDNS 도메인 이름 설정
var dyndnsDomain = 'taehyun.ddns.net'; // DDNS 도메인 이름

// DDNS를 사용하여 외부에서 접속 가능한 주소 생성
var externalAddress = 'http://' + dyndnsDomain + ':56789';
console.log('Server is accessible at ' + externalAddress);
*/