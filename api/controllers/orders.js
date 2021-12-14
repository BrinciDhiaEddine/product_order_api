const Order = require('../models/order')
const mongoose = require('mongoose')

exports.orders_get_all=(req,res,next)=>{           
    Order.find().select('_id productID quantity').exec()
    .then(
        ord =>{
            res.status(200).json({
                length : ord.length,
                orders : ord
            })
        })
    }

exports.orders_get_order=(req,res,next)=>{           // hne we can customize e request elli n7ebou nesta3mlouhom aal products
    const ID=req.params.orderID
    Order.findById(ID).select('productID quantity _id').exec()
    .then(
         ord => {
            res.status(200).json(ord)
        })
        }

exports.orders_create_order=(req,res,next)=>{
    const order=new Order({
        _id :new mongoose.Types.ObjectId(),
        productID : req.body.productID,
        quantity : req.body.quantity
    })
    order.save()
    .then(
        doc =>{res.status(200).json(doc)}
    )
    .catch()
}
    
    
