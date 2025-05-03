const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','resolved'],
        default:'pending'
    },
},{
    timestamps:true
})
const Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;