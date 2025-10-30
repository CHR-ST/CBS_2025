const net = require('net');

const server = net.createServer((socket) => {
  // Lytter til beskeder fra klienten
    socket.on('data', (data) => {
     console.log('Received', data.toString());
    
    // Svarer tilbage til klienten
    const reply = 'pong';
    console.log('Sent', reply);
    socket.write(reply);
  });
});

server.listen(8080);