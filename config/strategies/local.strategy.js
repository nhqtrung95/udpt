var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var db = require('../../models');
var User = db.model('user')

module.exports = function localStrategy() {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            User.findOne({
                    where: {
                        email: email
                    }
                })
                .then(function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    if (!user.correctPassword(password)) {
                        return done(null, false)
                    }
                    return done(null, user);
                })
        }
    ));
}