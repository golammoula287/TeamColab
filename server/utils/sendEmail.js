import nodemailer from "nodemailer"

const sendEmail = async ({ to, subject, text }) => {
    const transporter = nodemailer.createTransport({
        service: "Gmail", // or use a custom SMTP like "smtp.mailtrap.io"
        auth: {
            user: process.env.EMAIL_USER, // your email address
            pass: process.env.EMAIL_PASS, // your app password
        },
    })

    const mailOptions = {
        from: `"TeamColab" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    }

    await transporter.sendMail(mailOptions)
}

export default sendEmail
