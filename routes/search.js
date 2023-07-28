const express = require('express');
const {exec} = require("child_process");
const router = express.Router();
const jsonParser = express.json();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('search', { title: 'Search' });
});

module.exports = router;