'use strict';
var router = require('express').Router();
module.exports = router;

router.get('/', function(req, res) {
    res.render('index');
})

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
    res.status(404).end();
});
