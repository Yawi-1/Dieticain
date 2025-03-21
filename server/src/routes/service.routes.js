const express = require('express');
const { addService,getServices,getServiceById,deleteService,updateService } = require('../controllers/service.controllers');
const uploadSingleImage = require('../middlewares/upload.js')
const router = express.Router();

 router.post('/',uploadSingleImage,addService);
 router.get('/',getServices);
 router.get('/:id',getServiceById);
 router.delete('/:id',deleteService);
 router.put('/:id',updateService);
 
module.exports = router;