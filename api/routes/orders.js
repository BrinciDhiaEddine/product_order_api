const express = require('express')
const router =express.Router()
const mongoose = require('mongoose')
const Order = require('../models/order')
const checkAuth = require('../middleware/check-auth')
const ordersController =require('../controllers/orders')

router.get('/:orderID',checkAuth,ordersController.orders_get_order)
router.get('/',checkAuth,ordersController.orders_get_all)
router.post('/',checkAuth,ordersController.orders_create_order)
module.exports=router