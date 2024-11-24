const nodemailer = require("nodemailer");

const sendEmail = async(option)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const emailOptions = {
        from: 'ENotebook support<support@enotebook.com>', // sender address
        to: option.email,
        subject: option.subject,
        text: option.message
    }
    await transporter.sendMail(emailOptions);
}

module.exports = sendEmail;
