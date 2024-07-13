const {createTransport} = require("nodemailer");
import dotenv from 'dotenv';

dotenv.config();

const {sendMail} = createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT as string, 10),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendRegistrationEmail = (email: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Registration Successful',
        text: 'Thank you for registering!',
    };
    sendMail(mailOptions, (error: Error | null, info: any) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};