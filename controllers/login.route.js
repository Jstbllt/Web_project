// controllers/computers.route.js
const express = require('express');
const router = express.Router();
const auth = require("../utils/user.auth");
const userRepo = require("../utils/user.repository");

router.get("/", loginRootAction);
router.post("/login", loginPostAction);
router.get("/logout", logoutAction);

// http://localhost:9000/
function loginRootAction(request, response) {
    response.render('login');
}

async function loginPostAction(request, response) {
    areValid = await userRepo.areValidCredentials(request.body.username, request.body.userpass);

    if (areValid) {
        user = await userRepo.getOneUser(request.body.username);
        await request.login(user, function (err) {
            if (err) { return next(err); }
        });
        response.redirect("/index/admin");

    } else {
        response.send("Invalid credentials provided");
    }
}


function logoutAction(request, response) {
    request.logOut();
    response.redirect("/login");
}

module.exports = router;
