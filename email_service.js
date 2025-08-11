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

app.post("/api/send-email/:name/:receiver", (req, res) => {
    const mailOptions = {
        form: "diwasbk2k3@gmail.com",
        to: req.params.receiver,
        subject: req.body.subject,
        html: `<span style="padding: 20px;"><b>Hello, ${req.params.name}</b></span>` + req.body.html
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            res.send("Email Operation Failed! Please try again later.")
        } else {
            res.send({message:`Email sent successfully to ${mailOptions.to}`, success:true})
        }
    })
})

app.listen(4000, () => {
    console.log("server is runnning at the port 4000.");


})






/*
{
  "subject": "API Email Testing - Service Verification",
  "html": "<div style=\"font-family: Arial, sans-serif; color: #333; padding: 20px;\"><h2 style=\"color: #4CAF50;\">Backend API Email Service</h2><p>This is a test email sent via our <b>Backend API Email Service</b> to verify that the email-sending functionality is working correctly.</p><p>If you are receiving this message, the API is functioning as expected.</p><br><p>Best regards,</p><p><b>diwascodes</b> || Backend Email API Services</p></div>"
}
*/
