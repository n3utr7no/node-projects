const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name: {
        type: String,
        retuired: [true, "Please add contact name."]
    },
    email: {
        type: String,
        retuired: [true, "Please add contact email address."]
    },
    phone: {
        type: String,
        retuired: [true, "Please add contact phone number."]
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Contact", contactSchema);