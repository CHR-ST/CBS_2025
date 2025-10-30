const twilio = require("twilio");
require('dotenv').config();

// Twilio API nøgler
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Twilio klient
const client = twilio(accountSid, authToken);

async function createText() {
  const message = await client.messages.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.TWILIO_PHONE_RECIPIENT,
    body: "Hej fra Twilio og Node.js",
  });

  console.log(message);
}

createText();