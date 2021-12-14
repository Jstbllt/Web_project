// controllers/gpu.route.js
const express = require('express');
const router = express.Router();
const computerRepo = require('../utils/computers.repository');
const brandRepo = require('../utils/brands.repository');
const cpuRepo = require('../utils/cpu.repository');
const gpuRepo = require('../utils/gpu.repository');

router.get('/', gpuRootAction);
router.get('/list', gpuListAction);
router.get('/list/admin', gpuListAdminAction);
router.get('/show/:gpuId', gpuShowAction);
router.get('/show/admin/:gpuId', gpuShowAdminAction);
router.get('/del/:gpuId', gpuDelAction);
router.get('/edit/:gpuId', gpuEditAction);
router.post('/update/:gpuId', gpuUpdateAction);

// http://localhost:9000/gpus
function gpuRootAction(request, response) {
    response.redirect("/gpus/list");
}
async function gpuListAction(request, response) {
    var gpus = await gpuRepo.getAllGPU();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("gpus_list", { "gpus": gpus, "flashMessage": flashMessage });
}
async function gpuListAdminAction(request, response) {
    var gpus = await gpuRepo.getAllGPU();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("gpus_list_admin", { "gpus": gpus, "flashMessage": flashMessage });
}
async function gpuShowAction(request, response) {
    var oneGpu = await gpuRepo.getOneGpu(request.params.gpuId);
    response.render("gpus_show", { "oneGpu": oneGpu });
}
async function gpuShowAdminAction(request, response) {
    var oneGpu = await gpuRepo.getOneGpu(request.params.gpuId);
    response.render("gpus_show_admin", { "oneGpu": oneGpu });
}
async function gpuEditAction(request, response) {
    var brands = await brandRepo.getAllBrands();
    var cpus = await cpuRepo.getAllCPU();
    var gpus = await gpuRepo.getAllGPU();

    var gpuId = request.params.gpuId;
    if (gpuId!=="0")
        var gpu = await gpuRepo.getOneGpu(gpuId);
    else
        var gpu = gpuRepo.getBlankGpu();

    response.render("gpus_edit", { "oneGpu": gpu, "brands": brands, "cpu": cpus, "gpu": gpus  });
}
async function gpuDelAction(request, response) {
    var numRows = await gpuRepo.delOneGpu(request.params.gpuId);
    response.redirect("/gpus/list/admin");
}
async function gpuUpdateAction(request, response) {
    var gpuId = request.params.gpuId;
    if (gpuId==="0") gpuId = await gpuRepo.addOneGpu(request.body.gpu_brand);

    var numRows = await gpuRepo.editOneGpu(gpuId,
        request.body.gpu_brand,
        request.body.gpu_model,
        request.body.gpu_fillrate_pixel,
        request.body.gpu_cu,
        request.body.gpu_memory);

    response.redirect("/gpus/list/admin");
}

module.exports = router;