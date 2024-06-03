var express = require('express');
var router = express.Router();

router.get('/users', function(req, res, next) {
       res.render('index', { title: 'Express form ' });
});

module.exports = router;