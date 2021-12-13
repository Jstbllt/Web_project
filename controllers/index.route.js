// controllers/computers.route.js
const express = require('express');
const router = express.Router();
const indexRepo = require('../utils/index.repository');

router.get('/', indexRootAction);

// http://localhost:9000/index
function indexRootAction(request, response) {
    response.redirect("/index");
}

module.exports = router;