const mongoose = require('mongoose')
const Product = require('../models/product')

exports.products_get_all=(req,res,next)=>{     
     
    Product.find().select('name _id price productImage').then(
        doc=>{
            const response={
                length : doc.length ,
                product : doc.map(doc =>{
                    return {
                        name : doc.name,
                        price : doc.price,
                        _id : doc._id, 
                        productImage : doc.productImage,
                        URL : 'localhost:3000/products/'+ doc.id
                    }
                })
            }     
            res.status(200).json(response)
        })  

    }

exports.products_get_product=(req,res,next)=>{           // hne we can customize e request elli n7ebou nesta3mlouhom aal products
    const ID=req.params.productID
    Product.findById(ID).select('name _id price productImage').exec().then(
    doc => {
        console.log(doc)
        res.status(200).json(doc)
    }
    ).catch(err=>{
        console.log(err);
        res.status(500).json({
            err: err
        })
    })
    
}

exports.products_create_product=(req,res,next)=>{
    console.log(req.file);
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price: req.body.price,
        productImage: req.file.originalname
    });
    product.save().then(result => {console.log(result)
        res.status(201).json({
            message : 'this post request works',
            createdProduct : result
        })})
    .catch();
    
    
}


exports.products_update_product=(req,res,next)=>{
    const id = req.params.productID;
    const updateOps={};
    for(const ops of req.body){
        updateOps[ops.propName]=ops.value
    }
    Product.update({_id:id},{$set:updateOps}).exec().then(
       result =>{res.status(200).json(result)}
    ).catch(
        err=>{res.status(500).json(err)}
    )
}

exports.products_delete_product=(req,res,next)=>{
    const id= req.params.productID;
    Product.remove({_id:id}).exec().then(
        result => {res.status(200).json(result)}
    ).catch()
}