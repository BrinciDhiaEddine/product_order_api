const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')




mongoose.connect("mongodb+srv://dhia:" + process.env.Mongo_PWD + "@cluster0.jkcei.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
  
    useUnifiedTopology: true,
    useNewUrlParser: true
})


const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/user')






app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use((req,res,next)=>{                           
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept,Authorization')
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})
//Routes which should handle requests

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes)






app.use((req,res,next)=>{                           
    const error = new Error('NOT  FOUND !!')
    error.status=400;
    next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message : error.message
        }
        
    })
})

module.exports=app;