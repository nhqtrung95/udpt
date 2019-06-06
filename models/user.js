'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    let User = db.define('user', {
        email: {
            type: Sequelize.STRING,
            unique: true,
            isEmail: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING
        },
        salt: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.ENUM,
            values: ['client', 'staff', 'admin'],
            defaultValue: 'client'
        },
        resetPassword: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    }, {
        hooks: {
            beforeCreate: function (user) {
                if (user.changed('password')) {
                    user.salt = user.generateSalt();
                    user.password = user.encryptPassword(user.password, user.salt);
                }
            },
            beforeUpdate: function (user) {
                if (user.changed('password')) {
                    user.salt = user.generateSalt();
                    user.password = user.encryptPassword(user.password, user.salt);
                }
            }
        }
    })

    User.prototype.generateSalt = function () {
        return crypto.randomBytes(16).toString('base64');
    }

    User.prototype.encryptPassword = function (plainText, salt) {
        var hash = crypto.createHash('sha1');
        hash.update(plainText);
        hash.update(salt);
        return hash.digest('hex');
    }

    User.prototype.correctPassword = function(candidatePassword) {
        return this.encryptPassword(candidatePassword, this.salt) === this.password;
    }

    return User;

};

