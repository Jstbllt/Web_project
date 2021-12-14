// utils/computers.repository.js
pool = require("../utils/db.js");
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
            "computer_price": 0,
            "computer_stocks": 0
        };
    },
    async getAllComputers(){
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM computers " +
                "INNER JOIN brands ON computer_brand=brand_id "+
                "INNER JOIN cpu ON computer_cpu=cpu_id " +
                "LEFT OUTER JOIN gpu ON computer_gpu=gpu_id ";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) {
            throw err; 
        }
    },
    async getOneComputer(computerId){
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM computers " +
                "INNER JOIN cpu ON computer_cpu=cpu_id " +
                "LEFT OUTER JOIN gpu ON computer_gpu=gpu_id " +
                "INNER JOIN brands ON computer_brand=brand_id WHERE computer_id = ?";
            const rows = await conn.query(sql, computerId);
            conn.end();
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
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    },
    async addOneComputer(brandId, cpuID, gpuID){
        try {
            conn = await pool.getConnection();
            sql = "INSERT INTO computers (computer_id, computer_brand, computer_cpu, computer_gpu)VALUES (NULL, ?, ?, ?) ";
            const okPacket = await conn.query(sql, [brandId,cpuID,gpuID] );
            conn.end();
            return okPacket.insertId;
        }
        catch (err) {
            throw err; 
        }
    },
    async editOneComputer(computerId, computerBrand, computerModel, computerCpu, computerGpu, computerStorage, computerRam, computerSize, computerPrice, computerStocks){
        try {
            conn = await pool.getConnection();
            sql = "UPDATE computers SET computer_brand=?, computer_model=?, computer_cpu=?, computer_gpu=?, computer_storage=?, computer_ram=?, computer_size=?, computer_price=?, computer_stocks=? WHERE computer_id=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql, 
                        [computerBrand, computerModel, computerCpu, computerGpu, computerStorage, computerRam, computerSize, computerPrice, computerStocks, computerId]);
            conn.end();
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err; 
        }
    }
};
