const http = require('http')
const fs = require('fs')
const path = require('path')
const express = require('express')()
const port = process.env.PORT || 8080
const app = express.use(function (request, response) {
  let filePath = '.' + request.url
  if (filePath === './') { filePath = './index.html' }
  const extName = path.extname(filePath)
  let contentType = 'text/html'
  switch (extName) {
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
    case '.wav':
      contentType = 'audio/wav'
      break
  }
  fs.readFile(filePath, function (error, content) {
    if (error) {
      if (error.code === 'ENOENT') {
        fs.readFile('./404.html', (_, content) => {
          response.writeHead(200, { 'Content-Type': contentType })
          response.end(content, 'utf-8')
        })
      } else {
        response.writeHead(500)
        response.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n')
        response.end()
      }
    } else {
      response.writeHead(200, { 'Content-Type': contentType })
      response.end(content, 'utf-8')
    }
  })
})
const sev = http.createServer(app)
sev.listen(port, function () {
  console.log('listening on *:' + port)
})
const io = require('socket.io')(sev)
// io.on('connection', function (socket) {
//   socket.on('sign_wallet', function (msg) {
//     console.log(msg)
//     io.emit('sign_wallet', msg)
//   })
//   socket.on('image', function (msg) {
//     console.log(msg)
//     io.emit('image', msg)
//   })
//   socket.on('init', function (msg) {
//     console.log(msg)
//     io.emit('init', msg)
//   })
// })
