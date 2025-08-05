import nodemailer from "nodemailer"

import dotenv from "dotenv"

dotenv.config()






// credentials.


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_EMAIL_PASSWORD,
  },
});

// Wrap in an async IIFE so we can use await.
     const sendEmail =  async (to,subject,text) => {
  const info = await transporter.sendMail({
    from: process.env.HOST_EMAIL,
    to,
    subject,
    text
    
  });

  console.log("Message sent:", info.messageId);
};


export {sendEmail}

