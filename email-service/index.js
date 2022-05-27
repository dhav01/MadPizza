const { startServer } = require('./src/app')
const SLEEP_TIME = process.env.SLEEP_TIME || 30000

setTimeout(() => {
  startServer()
  console.log('RabbitMQ started!')
}, SLEEP_TIME)
