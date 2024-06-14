const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

const userInfoSchema = new mongoose.Schema({
    name: String,
    email: String
});

userInfoSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userInfoSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
        done(null, user);
    }).catch(function (err) {
        done(err);
    });
});

module.exports = User;
