const http = require('http')
const express = require('express')
const port = process.env.PORT || 4000
const app = express()
const sev = http.createServer(app)
sev.listen(port, function () {
  console.log('listening on *:' + port)
})
const io = require('socket.io')(sev)
io.on('connection', function (socket) {
  socket.on('sign_wallet', function (msg) {
    console.log(msg)
    io.emit('sign_wallet', msg)
  })
  socket.on('image', function (msg) {
    console.log(msg)
    io.emit('image', msg)
  })
  socket.on('init', function (msg) {
    console.log(msg)
    io.emit('init', msg)
  })
})
