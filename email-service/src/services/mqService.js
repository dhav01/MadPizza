const amqp = require('amqplib')
const { sendConfirmation } = require('../controllers/emailController')
const { EXCHANGE, QUEUE } = require('../resources/constants')
const PREFETCH_COUNT = process.env.PREFETCH_COUNT || 2 //specifies the number of emails being sent at the same time
const MQ_HOST = process.env.MQ_HOST || 'localhost'
const MQ_URL = `amqp://${MQ_HOST}:5672`

let orderChannel = null

//connecting to rabbitmq
exports.amqpConnectAndConsume = async () => {
  try {
    const mqConnection = await amqp.connect(MQ_URL) // connecting to rabbitmq
    orderChannel = await mqConnection.createChannel() //creating a channel

    //declaring an exchange
    await orderChannel.assertExchange(EXCHANGE, 'fanout', { durable: false })

    await orderChannel.assertQueue(QUEUE) //ensure that queue exists or create it if not
    await orderChannel.bindQueue(QUEUE, EXCHANGE) //bind the queue to the exchange

    orderChannel.prefetch(PREFETCH_COUNT)

    orderChannel.consume(QUEUE, (order) => {
      sendConfirmation(order, orderChannel)
    })

    console.log(
      'AMQP connection established successfully and email consumer is ready to consume'
    )
  } catch (error) {
    console.log('Fatal error', error)
    process.exit()
  }
}
