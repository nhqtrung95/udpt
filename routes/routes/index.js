'use strict';
var router = require('express').Router();
var db = require('../../models')
var Tag = db.model('tag')
var passport = require('passport');

module.exports = router;

router.get('/', function(req, res, next) {
    Tag.findAll({where: req.query})
    .then(function(tags) {
        res.render('client/index', {
            "tags": tags,
            "user": req.user
        });
    })
    .catch(next)

})

router.get('/login', function(req, res) {
    res.render('login');
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

//Admin router
router.use('/admin', require('./admin'));
