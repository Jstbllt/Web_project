// controllers/computers.route.js
const express = require('express');
const router = express.Router();
const indexRepo = require('../utils/index.repository');

router.get('/', indexRootAction);
router.get('/admin', indexAdminRootAction);

// http://localhost:9000/
function indexRootAction(request, response) {
    response.redirect("/index");
}

// http://localhost:9000/admin
function indexAdminRootAction(request, response) {
    response.render('index_admin');
}

module.exports = router;