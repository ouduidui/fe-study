// 基于TCP协议实现http服务
import {createServer} from "net";

const server = createServer(client => {
    // 可以在client实例中获取到客户端信息
    console.log('address', client.remoteAddress);
    console.log('port', client.remotePort);

    // 接收客户端数据
    client.on('data', data => {
        console.log('data', data.toString());
        // 获取并解析信息，对应返回响应报文
        client.write(`HTTP/1.1 200 OK\r
        Content-Type: text/html\r
        Content-Length: 19\r\n
        <h1>HelloWorld</h1>
`);

        // 关闭连接
        client.end();
    })
})

server.listen({
    host: '127.0.0.1',  // 监听IP
    port: '8080'        // 监听端口
},() => {
    console.log('Server Running')
})
