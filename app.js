require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const authController = require("./controllers/authController");
const userController = require("./controllers/userController");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DB_CONNECTION);

app.get("/", authController.getLogin);
app.post("/", authController.postLogin);
app.get("/signup", authController.getSignup);
app.post("/signup", authController.postSignup);
app.get("/profile", userController.getUser);
app.post("/profile", userController.postUser);
app.get("/profileInfo", userController.getProfileInfo);

app.listen(3300, function () {
    console.log("Server running at port 3300....");
});
