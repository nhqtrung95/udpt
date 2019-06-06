'use strict';
var router = require('express').Router();
var db = require('../../models')
var Tag = db.model('tag')

module.exports = router;

router.get('/', function(req, res, next) {
    Tag.findAll({where: req.query})
    .then(function(tags) {
        res.render('index', {
            "tags": tags
        });
    })
    .catch(next)

})
