const twilio = require("twilio");
require('dotenv').config();

// Twilio API nøgler
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Twilio klient
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: process.env.TWILIO_PHONE_NUMBER,
    to: process.env.TWILIO_PHONE_RECIPIENT,
    twiml:
      "<Response><Say>Hello this is Understory calling on behalf of our Gin Tasting offer.</Say></Response>",
  });

  console.log(call);
}

createCall();