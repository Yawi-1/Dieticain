const express = require('express');
require('dotenv').config();
const dbConnection = require('./src//db//dbConnection.js')
const serviceRouter = require('./src/routes/service.routes.js')
const app = express();

app.use(express.json())
app.use('/api',serviceRouter);

app.get('/',(req,res)=>{
    res.send('Nutri Care Server is Running .....')
})

app.listen(3000,()=>{
    console.log('Server is Running on Port 3000');
    dbConnection();
})