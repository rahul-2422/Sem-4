const ErrorHandler = require('../utils/errorhandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const User = require('../models/userModel')

exports.createUser = catchAsyncErrors(
    async(req, res, next) => {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        const user = await User.create({
            name, 
            email, 
            password,
            prof_pic:{
                public_id: 'sameple id',
                url: "profilepic"
            }
        })

        res.status(200).json({ 
            success: true,
            user
        })
    }
)