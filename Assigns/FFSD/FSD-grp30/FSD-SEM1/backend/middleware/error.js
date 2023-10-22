const errorHandler = require('../utils/errorhandler')

module.exports = (err, req, res, next)=>{
    
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal server error"

    //wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resource not found ${err.path}`
        err = new errorHandler(message, 400)    
    }

    res.status(err.statusCode).json({
        success: false,
        Error: err.message,
    })

}