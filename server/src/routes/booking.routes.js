const {Router} = require('express');
const {getBookings} = require('../controllers/booking.controllers.js');
const authenticate = require('../middlewares/authMiddleware.js')
const router = Router();

router.get('/',getBookings);

module.exports = router;