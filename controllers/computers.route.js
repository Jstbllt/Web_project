// controllers/computers.route.js
const express = require('express');
const router = express.Router();
const computerRepo = require('../utils/computers.repository');

router.get('/', computerRootAction);
router.get('/list', computerListAction);
router.get('/show/:computerId', computerShowAction);
router.get('/del/:computerId', computerDelAction);
router.get('/edit/:computerId', computerEditAction);
router.post('/update/:computerId', computerUpdateAction);

// http://localhost:9000/computers
function computerRootAction(request, response) {
    //response.send("ROOT ACTION");
    response.redirect("/computers/list");
}
async function computerListAction(request, response) {
    // response.send("LIST ACTION");
    var computers = await computerRepo.getAllComputers();
    // console.log(computers);
    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    
    response.render("computers_list", { "computers": computers, "flashMessage": flashMessage });
}
async function computerShowAction(request, response) {
    // response.send("SHOW ACTION");
    var oneComputer = await computerRepo.getOneComputer(request.params.computerId);
    response.render("computers_show", { "oneComputer": oneComputer });
}
async function computerEditAction(request, response) {
    // response.send("EDIT ACTION");
    var brands = await computerRepo.getAllBrands();
    var cpu = await computerRepo.getAllCPU();
    var oneCpu = await computerRepo.getOneCpu(request.params.cpuId);
    var gpu = await computerRepo.getAllGPU();
    var computerId = request.params.computerId;
    if (computerId!=="0")
        var computer = await computerRepo.getOneComputer(computerId);
    else
        var computer = computerRepo.getBlankComputer();
    response.render("computers_edit", { "oneComputer": computer, "oneCpu": oneCpu, "brands": brands, "cpu": cpu, "gpu": gpu  });
}
async function computerDelAction(request, response) {
    // response.send("DEL ACTION");
    // TODO: remove extras for computer, unless the computer cannot be removed!!!
    var numRows = await computerRepo.delOneComputer(request.params.computerId);
    request.session.flashMessage = "ROWS DELETED: "+numRows;
    response.redirect("/computers/list");
}
async function computerUpdateAction(request, response) {
    // response.send("UPDATE ACTION");
    var computerId = request.params.computerId;
    if (computerId==="0") computerId = await computerRepo.addOnecComputer(request.body.computer_brand);
    var isFancy = request.body.computer_isFancy === undefined ? 0 : 1;
    var numRows = await computerRepo.editOneComputer(computerId,
        request.body.computer_brand,
        request.body.computer_name,
        request.body.computer_baseprice,
        isFancy, 
        request.body.computer_realPrice);

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/computers/list");
}

module.exports = router;