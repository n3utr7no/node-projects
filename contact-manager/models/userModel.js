const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Please add username."],
    },
    email: {
        type: String,
        required: [true, "Please add email."],
        unique: [true, "Email already in use."],
    },
    password: {
        type: String,
        required: [true, "Please add a password."],
    }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);