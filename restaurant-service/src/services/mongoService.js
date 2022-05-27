const mongoose = require('mongoose')

exports.mongoConnect = () => {
  try {
    const DB = process.env.MONGO_URI.replace(
      '<password>',
      process.env.MONGO_PASSWORD
    )
    const conn = await mongoose.connect(DB)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log('Database connection error:', error.message)
  }
}

exports.changeOrderStatus = (orderModel, orderId, status) => {
  orderModel.findByIdAndUpdate(orderId, { status: status }, (err, order) => {
    if (err) console.error(err)
    else console.log(order)
  })
}
