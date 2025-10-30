const net = require('net');

// sæt port og host for serveren
const port = 8080;
const host = 'localhost';

const ping = (port, host) => {
  const client = new net.Socket();
  const message = 'ping';

  // Opretter forbindelse til serveren
  client.connect(port, host, () => {
    // sender besked til serveren
    client.write(message);
    console.log('Sent', message);
  });

  // Lytter til svar fra serveren
  client.on('data', (reply) => {
    console.log('Received', reply.toString());
    client.destroy(); // Lukker forbindelsen efter modtagelse af svar
  });
};

// Kald funktionen ping() med parametre
// ping(port, host);

const pingForRTT = (port, host) => {
  const client = new net.Socket();
  const message = 'ping';
  let sendTime;

  // Opretter forbindelse til serveren
  client.connect(port, host, () => {
    // sender besked til serveren
    sendTime = Date.now();
    client.write(message);
    console.log('Sent', message, 'at time:', sendTime);
  });

  // Lytter til svar fra serveren
  client.on('data', (reply, remote) => {
    const receivedTime = Date.now();
    console.log('Received', reply.toString(), 'at time:', receivedTime);
    const roundTripTime = receivedTime - sendTime;
    console.log('Round trip time:', roundTripTime, 'ms', remote && remote.address && remote.port ? 'from ' + remote.address + ':' + remote.port : '');
    client.destroy(); // Lukker forbindelsen efter modtagelse af svar
  });
};

// Kald funktionen pingForRTT() med parametre
// pingForRTT(port, host);