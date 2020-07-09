const { Router } = require('express');
const router = Router();
const { authenticateUser, isAdmin } = require('./auth');
const Pquerys = require('../database/p_querys');

router.use(authenticateUser);

router.get('/', async (req, res) => {
    try {
        const products = await Pquerys.getProducts();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).json({err: 'Ocurrió un error inesperado :('});
    }
})

router.get('/:id', (req, res) => {
    const id_product = req.params.id;
    const productFound = Pquerys.getProductById(id_product);
    productFound
    .then(product => res.status(200).send(product))
    .catch(err => res.status(400).send(`Producto inexistente ${err}`))
})

router.post('/', isAdmin, (req, res) => {
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