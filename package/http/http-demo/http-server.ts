import { createServer } from 'http';

// 创建一个http server
const httpServer = createServer((req, res) => {
  // 设置状态码
  res.statusCode = 200;
  // 设置响应头
  res.setHeader('Content-type', 'text/html');
  // 返回响应内容
  res.end('<h1>HelloWorld</h1>');
});

// 监听端口
httpServer.listen(8080, () => {
  console.log('Server Running');
});
