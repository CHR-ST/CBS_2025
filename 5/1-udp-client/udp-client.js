const dgram = require("dgram");
const { send } = require("process");
const client = dgram.createSocket("udp4");

// sæt port og host for serveren
const port = 6790;
const host = "localhost";

const ping = (port, host) => {
  const message = "ping";
  // sender besked til serveren
  client.send(message, 0, message.length, port, host, (error) => {
    // fejlhåndtering
    if (error) {
      console.error("Error sending message:", error);
      client.close();
      return;
    }
    console.log("Sent " + message.toString());
  });

  client.on("message", (message) => {
    console.log("Received " + message.toString());
    client.close();
  });
};

// Kald funktionen ping() med parametre
// ping(port, host);

// Sender en request og udregner svartiden
const pingForRTT = (port, host) => {
  const message = "ping";
  let sendTime;
    // sender besked til serveren
  client.send(message, 0, message.length, port, host, (error) => {
    sendTime = Date.now();
    // fejlhåndtering
    if (error) {
      console.error("Error sending message:", error);
      client.close();
      return;
    }
    console.log("Sent", message.toString(), "at time:", sendTime);
  });

  // Udregner svartiden fra serveren ved brug af Date.now()
  // Lytter til svar fra serveren
  client.on("message", (reply, remote) => {
    const receivedTime = Date.now();
    console.log("Received", reply.toString(), "at time:", receivedTime);
    const roundTripTime = receivedTime - sendTime;
    console.log("Round trip time:", roundTripTime, "ms", "from", remote.address + ":" + remote.port);
  });
};

// Kald funktionen pingForRTT() med parametre
// pingForRTT(port, host);
