const http = require('http');
const PORT = process.env.PORT || 4000;
const server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

server.listen(PORT, function() {
    console.log(`Server listening on: http://localhost:${PORT}`);
});