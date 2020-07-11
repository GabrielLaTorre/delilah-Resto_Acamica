const { getProductsById } = require('../database/p_querys');

async function createOder(obj) {
    const newOrder = obj;
    let idProducts = [];
    const products = newOrder.products;
    products.forEach(element => {
        const id = element.id_producto;
        idProducts.push(id);
    });
    const platos = await getProductsById(idProducts);
    console.log(platos);
}


module.exports = createOder;