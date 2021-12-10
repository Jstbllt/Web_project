// controllers/cpu.route.js
const express = require('express');
const router = express.Router();
const computerRepo = require('../utils/computers.repository');
const brandRepo = require('../utils/brands.repository');
const cpuRepo = require('../utils/cpu.repository');
const gpuRepo = require('../utils/gpu.repository');

router.get('/', computerRootAction);
router.get('/list', computerListAction);
router.get('/show/:computerId', computerShowAction);
router.get('/del/:computerId', computerDelAction);
router.get('/edit/:computerId', computerEditAction);
router.post('/update/:computerId', computerUpdateAction);