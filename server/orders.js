const { Router } = require('express');
const router = Router();
const { authenticateUser, isAdmin } = require('./auth');
const { createOrder, getAllOrders, updateOrder, deleteOrder } = require('../database/o_querys');

router.use(authenticateUser);

router.get('/', isAdmin, async(req, res) => {
    try {
        const orders = await getAllOrders();
        if(orders.length != 0){
            res.status(200).send(orders);
        } else {
            res.status(404).send('No hay pedidos disponibles!');
        }
    } catch (error) {
        res.status(400).send('Ocurrió un error :(' + error.message)
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

router.delete('/:id', isAdmin, async (req, res) => {
    const idOrder = req.params.id;
    const deleted = await deleteOrder(idOrder);
    if(deleted == 1) {
        res.status(200).send(`Pedido con id ${idOrder}, eliminado satisfactoriamente!`);
    } else {
        res.status(400).send(`
        Ocurrió un error :( 
            ${deleted}`)
    }
})

module.exports = router;