// utils/computers.repository.js
pool = require("../utils/db.js");
// JS include = relative to CONTROLLERS 
// VIEW include = relative to VIEWS
module.exports = {
    getBlankComputer(){ // defines the entity model
        return {
            "computer_id": 0,
            "computer_brand": 0,
            "computer_model": "XXXX",
            "computer_cpu": 0,
            "computer_gpu": 0,
            "computer_storage": 0,
            "computer_ram": 0,
            "computer_size": 0,
            "computer_price": 0
        };
    },
    async getAllBrands(){ // TODO? move to brands.repository.js
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM brands";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            throw err; // return false ???
        }
    },
    async getAllCPU(){ // TODO? move to cpu.repository.js
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM cpu";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) {
            // TODO: log/send error ...
            throw err; // return false ???
        }
    },
    async getOneCpu(cpuId){
        try {
            conn = await pool.getConnection();
            // sql = "SELECT * FROM computers INNER JOIN brands ON computer_brand=brand_id WHERE computer_id = "+computerId; // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input OR prepared statements OR use orm
            sql = "SELECT * FROM cpu INNER JOIN brands ON cpu_brand=brand_id WHERE cpu_id = ?";

            const rows = await conn.query(sql, cpuId);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            throw err;
        }
    },
    async getAllGPU(){ // TODO? move to gpu.repository.js
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM gpu";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) {
            // TODO: log/send error ...
            throw err; // return false ???
        }
    },
    async getAllComputers(){
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM computers INNER JOIN brands ON computer_brand=brand_id";
            const rows = await conn.query(sql);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            throw err; 
        }
    },
    async getOneComputer(computerId){
        try {
            conn = await pool.getConnection();
            // sql = "SELECT * FROM computers INNER JOIN brands ON computer_brand=brand_id WHERE computer_id = "+computerId; // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input OR prepared statements OR use orm
            sql = "SELECT * FROM computers INNER JOIN brands ON computer_brand=brand_id WHERE computer_id = ?";
            const rows = await conn.query(sql, computerId);
            conn.end();
            console.log("ROWS FETCHED: "+rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            throw err; 
        }
    },
    async delOneComputer(computerId){
        try {
            conn = await pool.getConnection();
            sql = "DELETE FROM computers WHERE computer_id = ?";
            const okPacket = await conn.query(sql, computerId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    },
    async addOneComputer(brandId){
        try {
            conn = await pool.getConnection();
            sql = "INSERT INTO computers (computer_id, computer_brand) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, brandId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            throw err; 
        }
    },
    async editOneComputer(computerId, computerBrand, computerModel, computerCpu, computerGpu, computerStorage, computerRam, computerSize, computerPrice){
        try {
            conn = await pool.getConnection();
            sql = "UPDATE computers SET computer_brand=?, computer_model=?, computer_cpu=?, computer_gpu=?, computer_storage=?, computer_ram=?, computer_size=?, computer_price=?, WHERE computer_id=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql, 
                        [computerBrand, computerModel, computerCpu, computerGpu, computerStorage, computerRam, computerSize, computerPrice, computerId]);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    }
};
