const mongoose = require('mongoose')
 

 function connectDB(){
   mongoose.connect(process.env.MONGO_URI)
   .then((data)=>{
    console.log('Database Connected')
   })
   .catch((err)=>{
    console.log('Database Connection Failed',err)
   })
}
module.exports = connectDB;