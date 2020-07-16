const { Products } = require('./db_connection');

async function getProducts() {
    try {
        const listProducts = await Products.findAll()
        return listProducts;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getProductsById(arr){
    const listProducts = await Products.findAll({
        where: {
            id_plato: arr
        },
        raw: true,
        rejectOnEmpty: true
    });
    if(listProducts.length < arr.length) {
        throw new Error("Error, revisa los id de los productos!");
    }
    return listProducts;
}

async function getProductById(id) {
    const productById = await Products.findOne({
        where: {
            id_plato : id
        },
        raw: true
    })
    if(!productById) {
        throw new Error(`Producto con id: ${id}, inexistente!`)
    }
    return productById;
}

async function createProduct(obj) {
    let uploadedProduct = obj
    try {
        uploadedProduct = await Products.create(obj);
    } catch (err) {
        throw new Error(err.message);
    }
    return uploadedProduct;
}

async function updateProduct(obj, id) {
    try {
        const productUpdated = await Products.update(obj, {
            where: {
                id_plato: id
            }
        });
        return productUpdated;
    } catch (err) {
        throw new Error(err.message)
    }
}

async function deleteProduct(id) {
    try {
        const deletedProduct = await Products.destroy({
            where: {
                id_plato: id
            }
        })
        return deletedProduct;
    } catch (err) {
        throw new Error(err.message)
    }
}


module.exports = {getProducts, createProduct, getProductById, updateProduct, deleteProduct, getProductsById};