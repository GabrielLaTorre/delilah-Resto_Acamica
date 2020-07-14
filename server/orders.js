const { Router } = require('express');
const router = Router();
const { authenticateUser } = require('./auth');
const { createOrder } = require('../database/o_querys');

router.use(authenticateUser);

router.get('/', (req, res) => {

});

router.post('/', async (req, res) => {
    const order = req.body;
    const { userLogged } = req.usuario;
    const orderCreated = await createOrder(order, userLogged);
    res.status(201).send(`Precio total: ${orderCreated}`);
});

router.put('/', (req, res) => {

});

module.exports = router;