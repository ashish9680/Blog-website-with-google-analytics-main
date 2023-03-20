const passport = require('passport')
const localPassport = require('passport-local').Strategy
const User = require('../models/user')

passport.serializeUser(function(user, done) {
    done(null, user._id)
})

passport.deserializeUser(function(id, done) {
    User.findById(id, (err, user) => {
        done(err, user);
    });
})

passport.use(
    "admin-login",
    new localPassport({
            usernameField: "email",
            passwordField: "password",
            passReqToCallback: true
        },
        (req, email, password, done) => {
            User.findOne({ email: req.body.email }, (err, user) => {
                if (err) {
                    return done(err);
                }
                console.log(user)
                if (!user) {
                    return done(null, false, {
                        message: "No user found with this email"
                    });
                }
                if (user.password != req.body.password) {
                    return done(null, false, { message: "Invalid email or Password" });
                }
                return done(null, user);
            });
        }
    )
);