const { Router } = require('express');
const router = Router();
const Pquerys = require('../database/p_querys');

router.get('/', (req, res) => {
    const products = Pquerys.getProducts();
    products
    .then(list => res.status(200).send(list))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
    const id_product = req.params.id;
    const productFound = Pquerys.getProductById(id_product);
    productFound
    .then(product => res.status(200).send(product))
    .catch(err => res.status(400).send(`Producto inexistente ${err}`))
})

router.post('/', (req, res) => {
    const newPlato = req.body;
    const newProduct = Pquerys.createProduct(newPlato);
    newProduct
    .then(() => {
        res.status(201).send(req.body);
    })
    .catch(err =>  res.status(400).send(`Algo salió mal :( 
        ${err}`))
})

router.put('/:id', (req, res) => {
    const id_plato = req.params.id;
    const updated = Pquerys.updateProduct(req.body, id_plato);
    updated
    .then(() => res.status(201).send('Producto modificado satisfactoriamente!'))
    .catch(err => res.status(400).send(`Algo salió mal :( 
        ${err}
    )`))
})

router.delete('/:id', (req, res) => {
    const id_plato = req.params.id;
    const deleted = Pquerys.deleteProduct(id_plato);
    deleted
    .then(() => res.status(200).send(`Producto con id ${id_plato}, eliminado satisfactoriamente!`))
    .catch(err => res.status(500).send(err))
})

module.exports = router;