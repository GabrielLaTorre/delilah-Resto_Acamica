const { Router } = require('express');
const router = Router();
const querys = require('../database/querys');

router.get('/', (req, res) => {
    const products = querys.getProducts();
    products
    .then(list => res.status(200).send(list))
})

router.get('/:id', (req, res) => {
    const id_product = req.params.id;
    const productFound = querys.getProductById(id_product);
    productFound
    .then(product => res.status(200).send(product));
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

router.put('/:id', (req, res) => {
    const id_plato = req.params.id;
    querys.updateProduct(req.body, id_plato);
    res.status(200).send('Ok');
})

module.exports = router;