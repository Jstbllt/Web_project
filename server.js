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

app.listen(process.env.WEB_PORT,
    function() { console.log("Listening on "+process.env.WEB_PORT); }
);
app.get('/', (req, res) => {
    res.send('Hello, nodejs website...');
});

app.set("view engine", "ejs");
app.set("views", "views");
// MIDDLEWARE REGISTRATIONS!
// app.use(callback1, callback2, callback3)
// app.use(routeBase, callback)
app.use("/hello", require("./controllers/hello.route"));

const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));
app.use("/computers", require("./controllers/computers.route"));
app.use("/static", express.static(__dirname + '/static'));


