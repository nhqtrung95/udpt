'use strict';

var router = require('express').Router()
var db = require('../../models')
var Address = db.model('address')
var User = db.model('user')
var Promise = require('sequelize').Promise


module.exports = router

router.post('/', function(req, res, next) {
    var creatingAddress = Address.create(req.body)

    var findingUser = User.findByPk(req.user.id)

    Promise.all([creatingAddress, findingUser])
    .spread(function(address, user) {
        user.addAddress(address)
        res.send(address)
    })
    .catch(next)
})

router.delete('/:addressId', function(req, res, next) {
   Promise.all([User.findByPk(req.user.id), Address.findByPk(req.params.addressId)])
   .spread(function(user, address) {
       return user.removeAddress(address.id);
   })
   .then(function() {
       res.send(204);
   })
   .catch(next)
})
