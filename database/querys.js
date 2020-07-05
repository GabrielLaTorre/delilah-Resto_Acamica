const SQL = require('sql-template-strings');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/delilah_resto');

async function getProducts() {
    const [listProducts] = await sequelize.query(SQL`SELECT * FROM platos`, { type: sequelize.QueryTypes.SELECT});
    return listProducts;
}

async function getProductById(id) {
    const [productById] = await sequelize.query(SQL`SELECT * FROM platos WHERE id_plato = ${id}`)
    return productById;
}

async function createProduct(nombre_plato, precio) {
    try {
        const [uploadedProduct] = await sequelize.query(SQL`INSERT INTO platos (nombre_plato, precio_plato) VALUES (${nombre_plato}, ${precio})`);
        return uploadedProduct;
    } catch(err) {
        console.log(err);   
    }
}

async function updateProduct(obj, id) {
    const productUpdated = {}
    // sequelize.query(SQL`UPDATE platos SET precio_plato = 100 WHERE id_plato = ${id}`)
    // .then(res => console.log(res))
    // .catch(err => console.log(err))
    for (const prop in obj) {
        const element = obj[prop];
        sequelize.query(SQL`UPDATE platos SET ${prop} = ${element} WHERE id_plato = ${id}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
}

module.exports = {getProducts, createProduct, getProductById, updateProduct};