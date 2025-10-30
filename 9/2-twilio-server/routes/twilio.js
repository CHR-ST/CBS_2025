var express = require('express');
var router = express.Router();
var twilio = require("twilio");
require('dotenv').config();

// Twilio API nøgler
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Opret Twilio klient
const client = twilio(accountSid, authToken);

// Twilio responses til webhook for opkald og beskeder
const VoiceResponse = twilio.twiml.VoiceResponse;
const MessagingResponse = twilio.twiml.MessagingResponse;

// Endpoint for at sende velkomstbesked
router.post("/message", async (req, res) => {
    // Hent telefonnummer og besked fra JSON-body
    const { phone, message } = req.body;

    if (!phone || !message) {
      return res.status(400).send("Indtast både telefonnummer og besked for at sende en SMS.");
    }

    try {
      const sms = await client.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: "+45" + phone,
      });
      console.log(sms);
      res.status(200).send("SMS besked sendt til telefonnummeret " + sms.to);
    } catch (error) {
      console.error("Fejl i håndtering af SMS besked til +45" + phone + ": ", error);
      res.status(500).send("Der skete en fejl i håndteringen af SMS besked til +45" + phone);
    }
});

// Endpoint for webhook til SMS beskeder
router.post("/message/webhook", twilio.webhook({ validate: false }), (req, res) => {
  const twiml = new MessagingResponse();

  console.log(req.body);
  console.log("From: ", req.body.From);
  console.log("Country: ", req.body.FromCountry);
  console.log("Message: ", req.body.Body);

  if (req.body.Body.toLowerCase() === "hej") {
    twiml.message("Hej og goddag");
  } else if (req.body.Body.toLowerCase() === "farvel") {
    twiml.message("Farvel og god dag");
  } else {
    twiml.message(`Det her er en SMS webhook. Vil du have en ven svar "hej" tilbage og "farvel" når I har snakket.`);
  }

  res.type("text/xml").send(twiml.toString());
});

// Endpoint for at lave opkald
router.post("/voice", async (req, res) => {
    let { phone, message } = req.body;

      if (!phone || !message) {
      return res.status(400).send("Indtast både telefonnummer og besked for at foretage et opkald.");
    }

    try {
        call = await client.calls.create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to: "+45" + phone,
            twiml:
              "<Response><Say>" + message + "</Say></Response>",
        });
      console.log(call);
      res.status(200).send("Opkald foretaget til telefonnummeret " + call.to);
    } catch (error) {
      console.error("Fejl i håndtering af opkaldet til +45" + phone + ": ", error);
      res.status(500).send("Der skete en fejl i håndteringen af opkaldet til +45" + phone);
    }
});

// Endpoint for webhook til at modtage opkald
router.post("/voice/webhook", twilio.webhook({ validate: false }), (req, res) => {
  const twiml = new VoiceResponse();

  console.log(req.body);

  twiml.say(
    `Thanks for calling! This is a Voice webhook and your phone number is ${req.body.From}. Goodbye from Understory!`
  );

  res.type("text/xml").send(twiml.toString());
});

// Endpoint for webhook til WhatsApp beskeder
router.post("/whatsapp/webhook", twilio.webhook({ validate: false }), (req, res) => {
    const twiml = new MessagingResponse();
  
    console.log(req.body);
    console.log("From: ", req.body.From);
    console.log("Message: ", req.body.Body);

    if (req.body.Body.toLowerCase() === "køb") {
        twiml.message("Tak for dit køb af oplevelse hos Understory");
      } else if (req.body.Body.toLowerCase() === "slut") {
        twiml.message("Farvel og tak for dit køb");
      } else {
        twiml.message(`Det her er en WhatsApp webhook. Svar "køb" for at købe hos Understory. Svar "slut" for at afslutte.`);
    }

    res.type("text/xml").send(twiml.toString());
  });

module.exports = router;
