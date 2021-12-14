// controllers/computers.route.js
const express = require('express');
const router = express.Router();
const indexRepo = require('../utils/index.repository');

router.get('/', indexRootAction);
router.get('/admin', indexAdminRootAction);
router.get('/contact', contactRootAction);
router.get('/contact/admin', contactAdminRootAction);

// http://localhost:9000/
function indexRootAction(request, response) {
    response.redirect("/index");
}

// http://localhost:9000/admin
function indexAdminRootAction(request, response) {
    response.render('index_admin');
}

// http://localhost:9000/contact
function contactRootAction(request, response) {
    response.render('contact');
}

// http://localhost:9000/contact/admin
function contactAdminRootAction(request, response) {
    response.render('contact_admin');
}

module.exports = router;