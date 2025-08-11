import express from "express"
import nodemailer from "nodemailer"
const app = express()
app.use(express.json())

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "diwasbk2k3@gmail.com",
        pass: ""
    }
});

app.post("/api/send-email", (req, res) => {
    const mailOptions = {
        form: "diwasbk2k3@gmail.com",
        to: "techdiwas19@gmail.com",
        subject: req.body.subject,
        text: req.body.text
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.send("Email Operation Failed! Please try again later.")
        } else {
            res.send(`Email sent successfully to ${mailOptions.to}`)
        }
    })
})


/*
{
  "subject": "API Email Testing - Service Verification",
  "text": "Backend API Email Service\n\nThis is a test email sent via our Backend API Email Service to verify that the email-sending functionality is working correctly.\n\nIf you are receiving this message, the API is functioning as expected.\n\nBest regards,\ndiwascodes || Backend Email API Services"
}
*/
app.listen(4000, () => {
    console.log("server is runnning at the port 4000.");


})
