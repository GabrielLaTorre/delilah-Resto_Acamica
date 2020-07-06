const SQL = require('sql-template-strings');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/delilah_resto');

async function createUser(obj) {
    let user;
    for (let prop in obj) {
        const element = obj[prop];
        user =+ await sequelize.query(SQL`INSERT INTO usuarios (${prop}) VALUES (${element})`)
    }
    return user;
}

module.exports = {
    createUser
}