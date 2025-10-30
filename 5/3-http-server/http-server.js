const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/ping') {
      res.writeHead(200, { 'Content-Type': 'text/plain', 'Set-Cookie': 'cookieName=cookieValue' });
      res.end('pong');
  }
});

server.listen(8000);