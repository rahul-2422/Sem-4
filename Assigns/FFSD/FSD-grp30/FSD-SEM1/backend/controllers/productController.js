const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const apiFeatures = require('../utils/apiFeatures')

//create a product -- Admin
exports.createProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.create(req.body)
    res.status(200).json({
        success: true,
        product
    })
})

//get all products
exports.getAllProducts = catchAsyncErrors(async(req, res)=>{
    
    const resultPerPage = 5
    const productCount = await Product.countDocuments()

    const apiFeature = new apiFeatures(Product.find(), req.query)
    .filter()
    const allProducts = await apiFeature.query;

    res.status(200).json({
        success: true,
        allProducts
    })
})

//update product -- Admin
exports.updateProduct = catchAsyncErrors(async(req, res)=>{

    let product = await Product.findById(req.params.id)

    if(!product) {
        return res.status(500).json({
            success: false,
            message: 'Product not found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })

    res.status(200).json({
        success: true,
        product
    })

})

//get product details
exports.getProductDetails = catchAsyncErrors(async(req, res, next)=>{
    let product = await Product.findById(req.params.id)

    if(!product) {
        return next(new ErrorHandler("product not found", 404))
    }
    res.status(200).json({
        success: true,
        product
    })
})

//delete product
exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        // return res.status(500).json({
        //     success: false,
        //     message: 'Product not found'
        // })
        return next(new ErrorHandler("product not found", 404))
    }
    await product.remove()
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    })
})