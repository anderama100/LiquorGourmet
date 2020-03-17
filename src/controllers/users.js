const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async(req, res) => {
    let errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: "Passwords do not match." });
    }
    if (password.length < 4) {
        errors.push({ text: "Passwords must be at least 4 characters." });
    }
    if (errors.length > 0) {
        errors.push({ text: "trying render." });
        res.render("users/signup", {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
        // Look for email coincidence
        errors.push({ text: "looking email coincidence" });
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash("error_msg", "The Email is already in use.");
            res.redirect("/users/signup");
        } else {
            // Saving a New User
            req.flash("saving a new user");
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            //console.log("attempting to log in");
            //alert('attempting to log in');
            await newUser.save();
            //console.log("attempting to save");
            //alert('attempting to save');
            req.flash("success_msg", "You are registered.");
            res.redirect("/users/signin");
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/spirits",
    failureRedirect: "/users/signin",
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out now.");
    res.redirect("/users/signin");
};

module.exports = usersCtrl;