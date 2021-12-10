// controllers/cpu.route.js
const express = require('express');
const router = express.Router();
const computerRepo = require('../utils/computers.repository');
const brandRepo = require('../utils/brands.repository');
const cpuRepo = require('../utils/cpu.repository');
const gpuRepo = require('../utils/gpu.repository');

router.get('/', cpuRootAction);
router.get('/list', cpuListAction);
router.get('/show/:cpuId', cpuShowAction);
router.get('/del/:cpuId', cpuDelAction);
router.get('/edit/:cpuId', cpuEditAction);
router.post('/update/:cpuId', cpuUpdateAction);

// http://localhost:9000/computers
function cpuRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.redirect("/cpu/list");
}
async function cpuListAction(request, response) {
    // response.send("LIST ACTION");
    var cpus = await cpuRepo.getAllCPU();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("cpus_list", { "cpus": cpus, "flashMessage": flashMessage });
}
async function cpuShowAction(request, response) {
    // response.send("SHOW ACTION");
    var oneCpu = await cpuRepo.getOneCpu(request.params.cpuId);
    response.render("cpus_show", { "oneCpu": oneCpu });
}
async function cpuEditAction(request, response) {
    // response.send("EDIT ACTION");
    var brands = await brandRepo.getAllBrands();
    var cpus = await cpuRepo.getAllCPU();

    var cpuId = request.params.cpuId;
    console.log(cpu);
    if (cpuId!=="0")
        var cpu = await cpuRepo.getOneCpu(cpuId);
    else
        var cpu = cpuRepo.getBlankCpu();

    response.render("cpus_edit", { "oneComputer": computer, "oneCpu": cpu, "brands": brands, "cpu": cpus, "gpu": gpu  });
}
async function cpuDelAction(request, response) {
    // response.send("DEL ACTION");
    // TODO: remove extras for cou, unless the cpu cannot be removed!!!
    var numRows = await cpuRepo.delOneCpu(request.params.cpuId);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/cpus/list");
}
async function cpuUpdateAction(request, response) {
    // response.send("UPDATE ACTION");
    var cpuId = request.params.cpuId;
    if (cpuId==="0") cpuId = await cpuRepo.addOneCpu(request.body.cpu_brand);

    var numRows = await cpuRepo.editOneCpu(cpuId,
        request.body.cpu_brand,
        request.body.cpu_model,
        request.body.cpu_basefrequency,
        request.body.cpu_boostfrequency,
        request.body.cpu_cores,);

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/cpus/list");
}

module.exports = router;