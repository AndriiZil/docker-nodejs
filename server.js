const port = 3000;
const server = require('http');

server
    .createServer((req, res) => {
        console.log('url:', req.url);
        res.end('hello world');
    })
    .listen(port, () => {
        console.log(`server is running on ${port}`);
    })
