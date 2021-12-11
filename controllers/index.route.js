// controllers/computers.route.js
const express = require('express');
const router = express.Router();
const computerRepo = require('../utils/index.repository');

router.get('/', computerRootAction);

// http://localhost:9000/index
function computerRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.redirect("/index");
}

module.exports = router;