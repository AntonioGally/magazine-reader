const db = require('../../database');

class MagazineRepository {
    // async findAll(orderBy: "ASC" | "DESC") {
    //     const rows = await db.query(`SELECT * FROM categories ORDER BY name ${orderBy}`);
    //     return rows;
    // }
}

module.exports = new MagazineRepository();