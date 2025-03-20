const express = require('express');
const { addService } = require('../controllers/service.controllers');
const uploadSingleImage = require('../middlewares/upload.js')
const router = express.Router();

 router.post('/add-service',uploadSingleImage,addService)


module.exports = router;