const { Router } = require('express');
const router = Router();
const { authenticateUser, isAdmin } = require('./auth');
const {getProducts, createProduct, getProductById, updateProduct, deleteProduct} = require('../database/p_querys');

router.use(authenticateUser);

router.get('/', async (req, res) => {
    const { userLogged } = req.usuario;
    console.log(userLogged);
    try {
        const products = await getProducts();
        res.status(200).send(products);
    } catch (err) {
        res.status(500).json({err: 'Ocurrió un error inesperado :('});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id_product = req.params.id;
        const productFound = await getProductById(id_product);
        res.status(200).send(productFound);
    } catch (err) {
        res.status(400).send(err.message);
    }
})

router.post('/', isAdmin, async (req, res) => {
    try {
        const newPlato = req.body;
        const newProduct = await createProduct(newPlato);
        res.status(201).json({
            id_plato: newProduct.id_plato
        })
    } catch (err) {
        res.status(400).send(
            `Algo salió mal :( 
            ${err.message}`);
    }
})

router.put('/:id', isAdmin, (req, res) => {
    try {
        const id_plato = req.params.id;
        const updated = updateProduct(req.body, id_plato);
        res.status(201).send('Producto modificado satisfactoriamente!');
    } catch (err) {
        res.status(400).send(`Algo salió mal :( ${err.message} `)
    }
})

router.delete('/:id', isAdmin, async (req, res) => {
    try {
        const id_plato = req.params.id;
        const deleted = await deleteProduct(id_plato);
        if (deleted == 1) {
            res.status(200).send(`Producto con id ${id_plato}, eliminado satisfactoriamente!`);
        } else {
            throw new Error(`el producto no pudo ser eliminado`);
        }
    } catch (err) {
        res.status(404).send(
            `Algo salió mal :( ${err.message}`
            )}
})

module.exports = router;