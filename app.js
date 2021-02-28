const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify({
            idx: 1,
            nums: [1, 2, 3, 4]
        }));
        res.end();
    }
});

server.listen(3000);

console.log('Port listening on 3000...');