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

exports.postUser = (req, res) => {

    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }

    const { address, phone, division, gender } = req.body;

    User.findById(req.user._id).then((user) => {
        if (user) {
            user.address = address;
            user.phone = phone;
            user.division = division;
            user.gender = gender;
            user.profileComplete = true;
            return user.save();
        }
    }).then(() => {
        res.redirect("/profileInfo");
    }).catch((err) => {
        console.log(err);
        res.redirect("/profile");
    });
};

exports.getProfileInfo = (req, res) => {

    User.findById(req.user._id).then((user) => {
        if (user) {
            res.render("profileInfo", {
                userName: user.name,
                userGender: user.gender,
                userEmail: user.username,
                userDivision: user.division,
                userAddress: user.address,
                userPhone: user.phone,
            });
        }
    }).catch((err) => {
        console.log(err);
        res.redirect("/");
    });
};
