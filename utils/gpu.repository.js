pool = require("../utils/db.js");

module.exports = {
    getBlankGpu(){ // defines the entity model
        return {
            "gpu_id": 0,
            "gpu_brand": 0,
            "gpu_model": "XXXX",
            "gpu_fillrate_pixel": 0,
            "gpu_cu": 0,
            "gpu_memory": 0
        };
    },

    async getAllGPU(){
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM gpu INNER JOIN brands ON gpu_brand=brand_id";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        }
        catch (err) {
            // TODO: log/send error ...
            throw err; // return false ???
        }
    },

    async getOneGpu(gpuId){
        try {
            conn = await pool.getConnection();
            // sql = "SELECT * FROM computers INNER JOIN brands ON computer_brand=brand_id WHERE computer_id = "+computerId; // SQL INJECTION => !!!!ALWAYS!!!! sanitize user input!
            // escape input OR prepared statements OR use orm
            sql = "SELECT * FROM gpu INNER JOIN brands ON gpu_brand=brand_id WHERE gpu_id = ?";
            const rows = await conn.query(sql, gpuId);
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

    async delOneGpu(gpuId){
        try {
            conn = await pool.getConnection();
            sql = "DELETE FROM gpu WHERE gpu_id = ?";
            const okPacket = await conn.query(sql, gpuId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err;
        }
    },
    async addOneGpu(brandId){ // ATTENTION QUEL PARA ???
        try {
            conn = await pool.getConnection();
            sql = "INSERT INTO gpu (gpu_id, gpu_brand) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, brandId); // affectedRows, insertId
            conn.end();
            console.log(okPacket);
            return okPacket.insertId;
        }
        catch (err) {
            throw err;
        }
    },
    async editOneGpu(gpuId, gpuBrand, gpuModel, gpuFillratePixel, gpuCu, gpuMemory){
        try {
            conn = await pool.getConnection();
            sql = "UPDATE gpu SET gpuBrand=?, gpuModel=?, gpuFillratePixel=?, gpuCu=?, gpuMemory=?, WHERE gpu_id=? "; // TODO: named parameters? :something
            const okPacket = await conn.query(sql,
                [gpuBrand, gpuModel, gpuFillratePixel, gpuCu, gpuMemory]);
            conn.end();
            console.log(okPacket);
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err;
        }
    }
};