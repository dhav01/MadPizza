const orderSchema = require('../models/orderModel')
const mongoose = require('mongoose')
const { changeOrderStatus } = require('../services/mongoService')
const { ORDER_ACCEPTED, ORDER_DELIVERED } = require('../resources/constants')

const orderModel = mongoose.model('Order', orderSchema)

const ORDER_DELIVERY_TIME = 10000 || process.env.ORDER_DELIVERY_TIME

exports.processOrder = (order, orderChannel) => {
  orderContent = JSON.parse(order.content.toString())
  changeOrderStatus(orderModel, orderContent.orderId, ORDER_ACCEPTED)
  setTimeout(() => {
    changeOrderStatus(orderModel, orderContent.orderId, ORDER_DELIVERED)
    orderChannel.ack(order)
  }, ORDER_DELIVERY_TIME)
}
