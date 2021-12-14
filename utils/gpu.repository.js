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
            throw err;
        }
    },

    async getOneGpu(gpuId){
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM gpu INNER JOIN brands ON gpu_brand=brand_id WHERE gpu_id = ?";
            const rows = await conn.query(sql, gpuId);
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

    async delOneGpu(gpuId){
        try {
            conn = await pool.getConnection();
            sql = "DELETE FROM gpu WHERE gpu_id = ?";
            const okPacket = await conn.query(sql, gpuId);
            conn.end();
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err;
        }
    },
    async addOneGpu(brandId){
        try {
            conn = await pool.getConnection();
            sql = "INSERT INTO gpu (gpu_id, gpu_brand) VALUES (NULL, ?) ";
            const okPacket = await conn.query(sql, brandId);
            conn.end();
            return okPacket.insertId;
        }
        catch (err) {
            throw err;
        }
    },
    async editOneGpu(gpuId, gpuBrand, gpuModel, gpuFillratePixel, gpuCu, gpuMemory){
        try {
            conn = await pool.getConnection();
            sql = "UPDATE gpu SET gpu_brand=?, gpu_model=?, gpu_fillrate_pixel=?, gpu_cu=?, gpu_memory=? WHERE gpu_id=? ";
            const okPacket = await conn.query(sql,
                [gpuBrand, gpuModel, gpuFillratePixel, gpuCu, gpuMemory, gpuId]);
            conn.end();
            return okPacket.affectedRows;
        }
        catch (err) {
            throw err;
        }
    }
};