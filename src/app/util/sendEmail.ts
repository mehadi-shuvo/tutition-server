import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (
  email: string,
  subject: string,
  text: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.mail_host,
      service: config.mail_service,
      port: Number(config.mail_port),
      secure: Boolean(config.mail_secure),
      auth: {
        user: config.mail_sender,
        pass: config.mail_pass,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: subject,
      text: 'hello there, this is your email verification link: \n' + text,
      headers: {
        Importance: 'high',
        'X-Priority': '1', // Most mail clients interpret '1' as high priority
        'X-MSMail-Priority': 'High',
      },
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('email not sent!');
    console.log(error);
    return error;
  }
};
