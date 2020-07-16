const {Sequelize, Orders, PxOrders, Products} = require('./db_connection');
const { getProductsById } = require('./p_querys');
const { getUser } = require('./u_querys');
const { getIdOfProducts, getProductsPrices, getTotalPrice } = require('../utils/functions');
const Moment = require('moment');
const moment = Moment();

async function getUserOrders(username) {
    const user = await getUser(username);
    const userId = user.id_usuario;
    const userOrders = await Orders.findAll({
        include: [
            {
                model: Products,
                through: {
                    as: 'PxO',
                    attributes: ['cantidad']
                }
            }
        ],
        where: {
            id_usuario_pedido: userId
        }
    });
    return userOrders;
}

async function getAllOrders(){
    const ordersFound = await Orders.findAll({
        include: [
            {
                model: Products,
                through: {
                    as: 'PxO',
                    attributes: ['cantidad']
                }
            }
        ],
    });
    return ordersFound;
}

async function updateOrder(id, settings) {
    try {
        const updated = await Orders.update(settings, {
            where: {
                id_pedido: id
            }
        });
        return updated[0];
    } catch (error) {
        return error.message;
    }
}

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
            estado_pedido: "Nuevo",
            metodo_pago: newOrder.metodo_pago,
            direccion: userLogued.direccion,
            id_usuario_pedido: userLogued.id_usuario,
            fecha_pedido: orderDate
        };
        const orderCreated = await insertOrder(nuevoPedido);
        const idNewOrder = orderCreated.id_pedido;
        const registerLoad = insertPxOrder(idNewOrder, newOrder.products);
        return (orderCreated);
    } catch (err) {
        return err.message;
    }
};

function insertPxOrder(id, array) {
    const register = array.map(element => {
        const id_plato = element.id_plato;
        const cantidad = element.cantidad;
        const created = {
                id_plato: id_plato,
                id_pedido: id,
                cantidad: cantidad
            };
        return created
    });
    PxOrders.bulkCreate(register);
    return register;
}

async function insertOrder(obj) {
    try {
        const orderCreated = await Orders.create(obj);
        return orderCreated;
    } catch (error) {
        console.log(error);
    }
}

async function deleteOrder(id) {
    try {
        const registerDeleted = await PxOrders.destroy({
            where: {
                id_pedido: id
            }
        });
        if (registerDeleted != 0) {
            const deleted = await Orders.destroy({
                where: {
                    id_pedido: id
                }
            });
            return deleted
        } else {
            throw new Error('No pudo eliminarse el registro del pedido!');
        }
    } catch (error) {
        return error.message
    }
}


module.exports = { createOrder, getAllOrders, updateOrder, getAllOrders, deleteOrder, getUserOrders};