const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    image:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    }
},{
    timestamps:true
});

const serviceModal = mongoose.model('services',serviceSchema);
module.exports = serviceModal;