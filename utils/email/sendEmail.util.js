import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendEmail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"عALMNY APP" <${process.env.EMAIL_USERNAME}>`,
            to,
            subject,
            html,
        });
        console.log('Email sent: ', info.messageId);
        return info;
    } catch (err) {
        console.error('Error sending email: ', err);
        throw err;
    }
};