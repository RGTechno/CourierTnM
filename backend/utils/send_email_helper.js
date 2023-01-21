require('dotenv').config()
const nodemailer = require('nodemailer')

async function sendEmail(refId, courierReceiverEmail, trackLoc) {
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
      to: courierReceiverEmail, // list of receivers
      subject: 'Update in your courier via Courier TnM', // Subject line
      html: `<p>Courier with reference id <b>${refId}</b> has an update.</p><p>You can track your courier through using this reference id.</p>
      <p>Track your courier <a href='http://${trackLoc}/track/courier'>here</a></p><br /><br />
      <p>Regard</p>`,
    })

    console.log('Email sent: ', info.messageId)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendEmail,
}
