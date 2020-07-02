const SQL = require('sql-template-strings');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/delilah_resto');

async function getProducts() {
    const [listProducts] = await sequelize.query(SQL`SELECT * FROM platos`, { type: sequelize.QueryTypes.SELECT});
    return listProducts;
}

async function createProduct(nombre_plato, precio) {
    try {
        const [uploadedProduct] = await sequelize.query(SQL`INSERT INTO platos (nombre_plato, precio_plato) VALUES (${nombre_plato}, ${precio})`);
        return uploadedProduct;
    } catch(err) {
        console.log(err);   
    }
}

module.exports = {getProducts, createProduct};