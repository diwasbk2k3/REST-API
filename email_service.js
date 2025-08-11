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