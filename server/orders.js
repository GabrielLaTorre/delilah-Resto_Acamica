const { Router } = require('express');
const router = Router();
const { authenticateUser, isAdmin } = require('./auth');
const { createOrder, getAllOrders, updateOrder } = require('../database/o_querys');

router.use(authenticateUser);

router.get('/', isAdmin, async(req, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send('Ocurrió un error :(')
    }
});

router.post('/', async (req, res) => {
    const order = req.body;
    const { userLogged } = req.usuario;
    const orderCreated = await createOrder(order, userLogged);
    res.status(201).send(orderCreated);
});

router.put('/:id', isAdmin, async (req, res) => {
    const updateSettings = req.body;
    const idOrder = req.params.id;
    const updated = await updateOrder(idOrder, updateSettings);
    if(updated == 1) {
        res.status(201).send(`Pedido con id ${idOrder}, modificado satisfactoriamente!`);
    } else {
        res.status(400).send(`Ocurrió un problema :(`);
    }
});

module.exports = router;