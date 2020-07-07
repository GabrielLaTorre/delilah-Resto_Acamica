const SQL = require('sql-template-strings');
const {sequelize, Products} = require('./db_connection');

async function getProducts() {
    const listProducts = await Products.findAll()
    return listProducts;
}

async function getProductById(id) {
    const productById = await Products.findOne({
        where: {
            id_plato : id
        }
    })
    return productById;
}

async function createProduct(obj) {
    const uploadedProduct = await Products.create(obj);
    return uploadedProduct;
}

async function updateProduct(obj, id) {
    const productUpdated = await Products.update(obj, {
        where: {
            id_plato: id
        }
    });
    return productUpdated;
}

async function deleteProduct(id) {
    const deletedProduct = await Products.destroy({
        where: {
            id_plato: id
        }
    })
    return deleteProduct;
}


module.exports = {getProducts, createProduct, getProductById, updateProduct, deleteProduct};