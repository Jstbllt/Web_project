const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const session = require("express-session");
app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day in msec
    resave: false
}));

// add after SESSION
const auth = require("./utils/user.auth");
auth.initialization(app);

app.listen(process.env.WEB_PORT,
    function() { console.log("Listening on "+process.env.WEB_PORT); }
);
app.get('/', (req, res) => {
    res.render('index');
});

app.set("view engine", "ejs");
app.set("views", "views");
// MIDDLEWARE REGISTRATIONS!
// app.use(callback1, callback2, callback3)
// app.use(routeBase, callback)

const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use("/computers", require("./controllers/computers.route"));
app.use("/index", require("./controllers/index.route"));
app.use("/cpus", require("./controllers/cpu.route"));
app.use("/gpus", require("./controllers/gpu.route"));
app.use("/connection", require("./controllers/login.route"));
app.use("/static", express.static(__dirname + '/static'));
