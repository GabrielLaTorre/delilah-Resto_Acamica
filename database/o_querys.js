const {Sequelize, Orders} = require('./db_connection');
const { getProductsById } = require('./p_querys');
const { getUser } = require('./u_querys');
const { getIdOfProducts, getProductsPrices, getTotalPrice } = require('../utils/functions');
const Moment = require('moment');
const moment = Moment();

async function createOrder(newOrder, username) {
    const idProducts = getIdOfProducts(newOrder.products);
    try {
        const orderProducts = await getProductsById(idProducts);
        const newPrices = getProductsPrices(orderProducts, newOrder.products);
        const totalPrice = getTotalPrice(newPrices);
        const userLogued = await getUser(username);
        const orderDate = moment.format('YYYY-MM-DD HH:mm:ss');
        const nuevoPedido = {
            precio_total: totalPrice,
            estado_pedido: 1,
            metodo_pago: newOrder.metodo_pago,
            direccion: userLogued.direccion,
            id_usuario_pedido: userLogued.id_usuario,
            fecha_pedido: orderDate
        };
        const orderCreated = insertOrder(nuevoPedido);
        console.log(orderCreated);
        return (totalPrice);
    } catch (err) {
        return err.message;
    }
}

async function insertOrder(obj) {
    try {
        const orderCreated = await Orders.create(obj);
        return orderCreated;
    } catch (error) {
        console.log(error);
    }
}


module.exports = { createOrder };