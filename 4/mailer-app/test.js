const nodemailer = require("nodemailer");

// Dette er eksempel på at sende en email med plain text og en HTML body 
// ved brug af Forward Email. Link: https://nodemailer.com/about/

// Gmail-konto oprettet til at teste med
// Email er cbs2025dis@gmail.com

// SMTP transport: https://nodemailer.com/smtp/

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "cbs2025dis@gmail.com",
    pass: "xxxxxxxx",
  },
});

// Verificer forbindelsen til Gmail SMTP serveren

transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
});

// Konfiguration af mails: https://nodemailer.com/message/

async function mailToUser(recipients, subjectMsg, textMsg, htmlMsg) {
    const sender = "CBS-2025 <cbs2025dis@gmail.com>";
    try {
        const info = await transporter.sendMail({
            from: sender,
            to: recipients,
            subject: subjectMsg,
            text: textMsg,
            html: htmlMsg,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error(error);
    }
}

// Opgave 1: Send en mail til dig selv med Nodemailer via Gmail SMTP Server
// Lav variabler og kald funktionen mailToUser() med parametre