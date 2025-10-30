const dgram = require('dgram');
const server = dgram.createSocket('udp4');

// Lytter til beskeder fra klienten
server.on('message', (message, remote) => {
    console.log('Received', message.toString());
    
    // Svarer tilbage til klienten
    const reply = 'pong';
    console.log('Sent', reply)
    server.send(reply, 0, reply.length, remote.port, remote.address);
});

server.bind(6790);