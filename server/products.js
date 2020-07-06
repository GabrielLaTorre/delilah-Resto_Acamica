const { Router } = require('express');
const router = Router();
const Pquerys = require('../database/p_querys');

router.get('/', (req, res) => {
    const products = Pquerys.getProducts();
    products
    .then(list => res.status(200).send(list))
})

router.get('/:id', (req, res) => {
    const id_product = req.params.id;
    const productFound = Pquerys.getProductById(id_product);
    productFound
    .then(product => res.status(200).send(product));
})

router.post('/', (req, res) => {
    const {nombre_plato, precio_plato} = req.body;
    const newProduct = Pquerys.createProduct(nombre_plato, precio_plato);
    newProduct
    .then(product => {
        console.log(product); // <--- Devuelve el ID del producto creado
        res.status(201).send(req.body);
    })
})

router.put('/:id', (req, res) => {
    const id_plato = req.params.id;
    Pquerys.updateProduct(req.body, id_plato);
    res.status(200).send('Ok');
})

router.delete('/:id', (req, res) => {
    const id_plato = req.params.id;
    const deleted = Pquerys.deleteProduct(id_plato);
    deleted
    .then(result => res.status(200).send(`Producto con id ${id_plato}, eliminado satisfactoriamente!`))
    .catch(err => res.status(500).send(err))
})

module.exports = router;