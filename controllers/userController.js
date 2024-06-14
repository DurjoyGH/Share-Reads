const User = require("../models/user");
const passport = require("passport");

exports.getUser = (req, res) => {

    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }

    User.findById(req.user._id).then(function (foundUser) {
        if (foundUser) {
            res.render("profile", { userName: foundUser.name });
        } else {
            res.status(404).send("User not found");
        }
    }).catch(function (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    });
};
