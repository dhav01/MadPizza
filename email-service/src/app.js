const { amqpConnectAndConsume } = require('./services/mqService')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })

exports.startServer = () => {
  amqpConnectAndConsume()
  //connecting to rabbitmq and consuming orders
}
