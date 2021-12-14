// controllers/computers.route.js
const express = require('express');
const router = express.Router();
const computerRepo = require('../utils/computers.repository');
const brandRepo = require('../utils/brands.repository');
const cpuRepo = require('../utils/cpu.repository');
const gpuRepo = require('../utils/gpu.repository');

router.get('/', computerRootAction);
router.get('/list', computerListAction);
router.get('/list/admin', computerListAdminAction);
router.get('/show/:computerId', computerShowAction);
router.get('/show/admin/:computerId', computerShowAdminAction);
router.get('/del/:computerId', computerDelAction);
router.get('/edit/:computerId', computerEditAction);
router.post('/update/:computerId', computerUpdateAction);

// http://localhost:9000/computers
function computerRootAction(request, response) {
    response.redirect("/computers/list");
}
async function computerListAction(request, response) {
    var computers = await computerRepo.getAllComputers();
    var brands = await brandRepo.getAllBrands();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    response.render("computers_list", { "computers": computers, "brands": brands, "flashMessage": flashMessage });
}
async function computerListAdminAction(request, response) {
    var computers = await computerRepo.getAllComputers();
    var brands = await brandRepo.getAllBrands();
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";

    response.render("computers_list_admin", { "computers": computers, "brands": brands, "flashMessage": flashMessage });
}
async function computerShowAction(request, response) {
    var oneComputer = await computerRepo.getOneComputer(request.params.computerId);
    var brands = await brandRepo.getAllBrands();
    response.render("computers_show", { "oneComputer": oneComputer, "brands": brands });
}
async function computerShowAdminAction(request, response) {
    var oneComputer = await computerRepo.getOneComputer(request.params.computerId);
    var brands = await brandRepo.getAllBrands();
    response.render("computers_show_admin", { "oneComputer": oneComputer, "brands": brands });
}

async function computerEditAction(request, response) {
    var cpus = await cpuRepo.getAllCPU();
    var gpus = await gpuRepo.getAllGPU();
    var brands = await brandRepo.getAllBrands();

    var computerId = request.params.computerId;
    if (computerId!=="0")
        var computer = await computerRepo.getOneComputer(computerId);
    else
        var computer = computerRepo.getBlankComputer();

    response.render("computers_edit", { "oneComputer": computer, "brands": brands, "cpu": cpus, "gpu": gpus });
}

async function computerDelAction(request, response) {
    var numRows = await computerRepo.delOneComputer(request.params.computerId);
    response.redirect("/computers/list/admin");
}
async function computerUpdateAction(request, response) {
    var computerId = request.params.computerId;
    if (computerId==="0")
        computerId = await computerRepo.addOneComputer(request.body.computer_brand,request.body.computer_cpu,request.body.computer_gpu);

    var numRows = await computerRepo.editOneComputer(computerId,
        request.body.computer_brand,
        request.body.computer_model,
        request.body.computer_cpu,
        request.body.computer_gpu,
        request.body.computer_storage,
        request.body.computer_ram,
        request.body.computer_size,
        request.body.computer_price,
        request.body.computer_stocks);

    response.redirect("/computers/list/admin");
}

module.exports = router;