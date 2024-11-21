const db = require('../config/db');

const addSchool = async (name, address, latitude, longitude) => {
    const sql = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
    await db.execute(sql, [name, address, latitude, longitude]);
};

const getAllSchools = async () => {
    const sql = `SELECT * FROM schools`;
    const [rows] = await db.execute(sql);
    return rows;
};

module.exports = { addSchool, getAllSchools };
