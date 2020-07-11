const { Router } = require('express');
const router = Router();
const { authenticateUser } = require('./auth');
const { createOrder } = require('../database/o_querys');
const createOder = require('../database/o_querys');

router.use(authenticateUser);

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    const order = req.body;
    createOder(order);
    console.log(req.usuario);
    res.status(201).send(order);
});

router.put('/', (req, res) => {

});

module.exports = router;