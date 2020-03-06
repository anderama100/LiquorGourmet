const router = require("express").Router();

const {
    renderSignUpForm,
    signup,
    renderSigninForm,
    signin,
    logout
} = require("../controllers/users.js");

// Routes
router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", signup);

router.get("/users/signin", renderSigninForm);

router.post("/users/signin", signin);

router.get("/users/logout", logout);

module.exports = router;