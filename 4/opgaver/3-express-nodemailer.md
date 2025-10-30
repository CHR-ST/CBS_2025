# Opgave 3 - SMTP med Express og Nodemailer

Åben mappen mailer-app i Terminalen og kør npm install og derefter npm start.

[Link til Nodemailer](https://nodemailer.com/)

[Link til npm pakke](https://www.npmjs.com/package/nodemailer) 

I /routes/mail.js er der lavet endpoint for at sende email.

```javascript
router.post("/", async (req, res) => {
  console.log(req.body);
  const { sendTo, sendSubject, sendText } = req.body;
  await mailToUser(sendTo, sendSubject, sendText);
  res.status(201).json({ message: "Email sendt afsted!" });
});
```

I /public/index.html er der lavet HTML og JavaScript på klient-siden.

Der laves en fetch() med HTTP POST metode til /mail endpoint.

Husk at lave en Gmail-konto selv og oprette et app password.

Email og app password skal indsættes for transporter i /routes/mail.js