const { sendEmail } = require('../services/emailService')
const { EMAIL_SUBJECT, EMAIL_TEXT_DEFAULT } = require('../resources/constants')
const EMAIL_ID = process.env.EMAIL_ID

var mailOptions = {
  from: EMAIL_ID,
  to: '',
  subject: EMAIL_SUBJECT,
  text: EMAIL_TEXT_DEFAULT,
}

exports.sendConfirmation = (order, orderChannel) => {
  orderContent = JSON.parse(order.content.toString())
  mailOptions.to = orderContent.email
  mailOptions.text = `Your order ${orderContent._id} amounting to ${orderContent.total} is confirmed and will be delivered shortly.`
  sendEmail(mailOptions, (err, info) => {
    if (err) {
      console.log(err, 'Failed to send order confirmation email')
    } else {
      orderChannel.ack(order)
    }
  })
}
