const session = require("express-session");
const passport = require("passport");
const usersRepo = require("../utils/user.repository.js");

module.exports = {
    initialization(app) {
        app.use(passport.initialize());
        app.use(passport.session());
        passport.serializeUser(function (user, done) {
            done(null, user.user_name);
        });
        passport.deserializeUser(async function (username, done) {
            let user = await usersRepo.getOneUser(username);
            done(null, user);
        });
    },
};