var express = require("express");
var nodemailer = require("nodemailer");
var router = express.Router();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "cbs2025dis@gmail.com",
    pass: "xxxxxxxxxxxx",
  },
});

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server er klar til at tage imod emails");
  }
});

const mailToUser = async (recipients, subjectMsg, textMsg) => {
  const sender = "CBS-2025 <cbs2025dis@gmail.com>";
  try {
    const info = await transporter.sendMail({
      from: sender,
      to: recipients,
      subject: subjectMsg,
      text: textMsg,
    });
    console.log("Email sendt afsted: %s", info.messageId);
  } catch (error) {
    console.error(error);
  }
};

/* POST send en mail med nodemailer med JSON data fra request */
router.post("/", async (req, res) => {
  console.log(req.body);
  const { sendTo, sendSubject, sendText } = req.body;
  await mailToUser(sendTo, sendSubject, sendText);
  res.status(201).json({ message: "Email sendt afsted!" });
});

module.exports = router;
