pool = require("../utils/db.js");


module.exports = {
    async getAllBrands() {
        try {
            conn = await pool.getConnection();
            sql = "SELECT * FROM brands";
            const rows = await conn.query(sql);
            conn.end();
            return rows;
        } catch (err) {
            // TODO: log/send error ...
            throw err; // return false ???
        }
    },
}