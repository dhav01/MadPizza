const { startServer } = require('./src/app')
const dotenv = require('dotenv')

dotenv.config({ path: './config/config.env' })
const SLEEP_TIME = process.env.SLEEP_TIME || 30000

setTimeout(() => {
  startServer()
  console.log('Restaurant service online!')
}, SLEEP_TIME)
