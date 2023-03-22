const express = require("express");
const app = express();
const sgMail = require("@sendgrid/mail");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => res.send("Hello World!"));

app.post("/sendmail", (req, res) => {
  const { name, email, subject, message } = req.body;
  sgMail.setApiKey(process.env.SG_API_KEY);
  const messages = [
    {
      to: `akshaychavan010101@gmail.com`,
      from: "akki010102@gmail.com",
      subject: subject,
      html: `
        <strong>
           <h2>From: ${name}</h2>
           <h2> Email: ${email}</h2>
           <p>${message}<p>
        </strong>`,
    },
  ];
  sgMail.send(messages).then((success, error) => {
    if (error) {
      res.send({
        msg: "Something Went Wrong",
        Error: error.response.body,
      });
    }
    else{
      res.json({
        msg: "Mail Sent Successfully",
      });
    }
  });
});

app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}`));
