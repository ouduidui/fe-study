const http = require('http');
const fs = require('fs');
const path = require('path');

http
  .createServer(function (request, response) {
    console.log('request come', request.url);

    if (request.url === '/') {
      const html = fs.readFileSync(path.resolve(__dirname, './test.html'), 'utf8');
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.end(html);
    }

    // Expires 强缓存
    if (request.url === '/script.js') {
      const date = new Date();
      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        Expires: new Date(date.setMinutes(date.getMinutes() + 1)).toString()
      });
      response.end('console.log("script loaded")');
    }
    // Cache-Control 强缓存
    else if (request.url === '/script2.js') {
      response.writeHead(200, {
        'Content-Type': 'text/javascript',
        'Cache-Control': 'max-age=20,public' // 缓存20s 多个值用逗号分开
      });
      response.end('console.log("script2 loaded")');
    }
  })
  .listen(8888);

console.log('server listening on 8888');
