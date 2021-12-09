pool = require("../utils/db.js");



module.exports = {
    getBlankGpu(){ // defines the entity model
        return {
            "cpu_id": 0,
            "cpu_brand": 0,
            "cpu_model": "XXXX",
            "cpu_basefrequency": 0,
            "cpu_boostfrequency": 0,
            "cpu_cores": 0
        };
    },
    async getAllGPU(){
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
}