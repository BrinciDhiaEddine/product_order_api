const express = require('express')
const router =express.Router()
const mongoose = require('mongoose')
const multer=require('multer')
const Product = require('../models/product')
const productController = require('../controllers/products')
const storage = multer.diskStorage({
    destination : function(req,file,cb){
       cb(null,'uploads');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    }
})
const filefilter = (req,file,cb)=>{
    if(file.mimeType==='Image/jpeg' || file.mimeType==='Image/png'){
        cb(null,false);
    }
    else{cb(null,true)}
}
const upload = multer({storage:storage,fileFilter:filefilter})
const checkAuth=require('../middleware/check-auth')


router.get('/:productID',productController.products_get_product)
router.get('/',productController.products_get_all)
router.post('/',checkAuth,upload.single('productImage'),productController.products_create_product)
router.delete('/:productID',productController.products_delete_product)
router.patch('/:productID',productController.products_update_product)


module.exports=router