const http = require('http')

console.log(http)

const server = http.createServer((req,res)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Hello from the Node.js</h1>')
    res.end();
})

server.listen(3000);
