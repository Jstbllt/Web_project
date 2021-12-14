// controllers/cpu.route.js
const express = require('express');
const router = express.Router();
const brandRepo = require('../utils/brands.repository');
const cpuRepo = require('../utils/cpu.repository');
const gpuRepo = require('../utils/gpu.repository');

router.get('/', cpuRootAction);
router.get('/list', cpuListAction);
router.get('/list/admin', cpuListAdminAction);
router.get('/show/:cpuId', cpuShowAction);
router.get('/show/admin/:cpuId', cpuShowAdminAction);
router.get('/del/:cpuId', cpuDelAction);
router.get('/edit/:cpuId', cpuEditAction);
router.post('/update/:cpuId', cpuUpdateAction);

// http://localhost:9000/cpus
function cpuRootAction(request, response) {
    response.redirect("/cpus/list");
}
async function cpuListAction(request, response) {
    var cpus = await cpuRepo.getAllCPU();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("cpus_list", { "cpus": cpus, "flashMessage": flashMessage });
}
async function cpuListAdminAction(request, response) {
    var cpus = await cpuRepo.getAllCPU();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("cpus_list_admin", { "cpus": cpus, "flashMessage": flashMessage });
}

async function cpuShowAction(request, response) {
    var oneCpu = await cpuRepo.getOneCpu(request.params.cpuId);
    response.render("cpus_show", { "oneCpu": oneCpu });
}
async function cpuShowAdminAction(request, response) {
    var oneCpu = await cpuRepo.getOneCpu(request.params.cpuId);
    response.render("cpus_show_admin", { "oneCpu": oneCpu });
}
async function cpuEditAction(request, response) {
    var brands = await brandRepo.getAllBrands();
    var cpus = await cpuRepo.getAllCPU();
    var gpus = await gpuRepo.getAllGPU();

    var cpuId = request.params.cpuId;
    if (cpuId!=="0")
        var cpu = await cpuRepo.getOneCpu(cpuId);
    else
        var cpu = cpuRepo.getBlankCpu();

    response.render("cpus_edit", { "oneCpu": cpu, "brands": brands, "cpu": cpus, "gpu": gpus  });
}
async function cpuDelAction(request, response) {
    var numRows = await cpuRepo.delOneCpu(request.params.cpuId);
    response.redirect("/cpus/list/admin");
}
async function cpuUpdateAction(request, response) {
    var cpuId = request.params.cpuId;
    if (cpuId==="0") cpuId = await cpuRepo.addOneCpu(request.body.cpu_brand);

    var numRows = await cpuRepo.editOneCpu(cpuId,
        request.body.cpu_brand,
        request.body.cpu_model,
        request.body.cpu_basefrequency,
        request.body.cpu_boostfrequency,
        request.body.cpu_cores,);

    response.redirect("/cpus/list/admin");
}

module.exports = router;