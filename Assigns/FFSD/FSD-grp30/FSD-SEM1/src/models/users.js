const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        minlength:3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        min:10,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    loginType: {
        type: String,
        defualt : 'normal',
        enum: ["google", "facebook", "normal"]
    }
})

const user = new mongoose.model("User", userSchema);

module.exports = user