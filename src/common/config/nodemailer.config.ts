import nodemailer from 'nodemailer';
import ApiError from '../utils/api-error.ts';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

const sendEmail = async (to: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to,
    subject,
    html
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.error('Error sending email:', error);
    throw ApiError.requestFailed('Failed to send email');
  }
};

export default sendEmail;
