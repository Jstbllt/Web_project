pool = require("../utils/db.js");

module.exports = {
    getBlankCpu(){ // defines the entity model
        return {
            "cpu_id": 0,
            "cpu_brand": 0,
            "cpu_model": "XXXX",
            "cpu_basefrequency": 0,
            "cpu_boostfrequency": 0,
            "cpu_cores": 0
        };
    },
    async getAllCPU(){
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM cpu INNER JOIN brands ON cpu_brand=brand_id";
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

    async delOneCpu(cpuId){
        try {
            conn = await pool.getConnection();
            sql = "DELETE FROM cpu WHERE cpuId = ?";
            const okPacket = await conn.query(sql, cpuId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err;
        }
    },
    async addOneCpu(brandId){ // ATTENTION QUEL PARA ???
        try {
            conn = await pool.getConnection();
            sql = "INSERT INTO computers (cpu_id, computer_brand) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, brandId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            throw err;
        }
    },
    async editOneCpu(cpuId, cpuBrand, cpuModel, cpuBaseFrequency, cpuBoostFrequency, cpuCores){
        try {
            conn = await pool.getConnection();
            sql = "UPDATE cpu SET cpuBrand=?, cpuModel=?, cpuBaseFrequency=?, cpuBoostFrequency=?, cpuCores=?, WHERE cpu_id=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql,
                [cpuBrand, cpuModel, cpuBaseFrequency, cpuBoostFrequency, cpuCores]);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err;
        }
    }
};
