const express = require('express');
const app = express();


app.get('/',(req,res)=>{
    res.send('Nutri Care Server is Running .....')
})

appp.listen(3000)