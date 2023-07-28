const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('qr', { title: 'QR' });
});


module.exports = router;