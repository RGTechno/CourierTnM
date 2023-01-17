require('dotenv').config()
const nodemailer = require('nodemailer')

async function sendEmail(refId, courierSenderEmail, courierReceiverEmail) {
  try {
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
      tls: { rejectUnauthorized: true },
    })

    let info = await transporter.sendMail({
      from: '"Courier TnM" <couriertnm@gmail.com>', // sender address
      to: `${courierReceiverEmail}`, // list of receivers
      subject: 'Update in your courier via Courier TnM', // Subject line
      text: `Courier with reference id ${refId} has an update.\nYou can track your courier using this reference id\n\nRegards`, // plain text body
    })

    console.log('Email sent: ', info.messageId)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendEmail,
}
