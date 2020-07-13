const { getProductsById } = require('../database/p_querys');
const { getIdOfProducts } = require('../utils/functions');

async function createOder(newOrder) {
    let idProducts = getIdOfProducts(newOrder.products);
    const orderProducts = await getProductsById(idProducts);
    console.log(orderProducts);
}


module.exports = createOder;