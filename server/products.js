const { Router } = require('express');
const router = Router();
const querys = require('../database/querys');

router.get('/', (req, res) => {
    const products = querys.getProducts();
    products
    .then(list => res.status(200).send(list))
})

router.post('/', (req, res) => {
    const {nombrePlato, precio} = req.body;
    const newProduct = querys.createProduct(nombrePlato, precio);
    newProduct
    .then(product => {
        console.log(product); // <--- Devuelve el ID del producto creado
        res.status(201).send(req.body);
    })
})

module.exports = router;