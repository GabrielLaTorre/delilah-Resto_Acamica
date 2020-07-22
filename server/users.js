const {Router} = require('express');
const router = Router();
const {createUser, updateUser, getUser} = require('../database/u_querys');
const { validateUser, isAdmin, authenticateUser } = require('./auth');
const { getUserOrders } = require('../database/o_querys');

router.get('/orders', authenticateUser, async (req, res) => {
    const username = req.usuario.userLogged;
    const ordersFound = await getUserOrders(username);
    if(ordersFound.length != 0){
        res.status(200).send(ordersFound);
    } else {
        res.status(404).send('No hay pedidos disponibles!');
    }
})

router.post('/login', async (req, res) => {
    const userLogin = req.body;
    [userLogged, token] = await validateUser(userLogin);
    if(!userLogged) {
        res.status(400).send('Usuario y/o contraseña incorrectos...');
        return;
    } 
    res.status(200).send(`Bienvenido ${userLogged}!
    Tu token de autenticación es: ${token}`);
})

router.post('/register', async (req, res) => {
    const newUser = req.body;
    try {
        const created = await createUser(newUser);
        res.status(201).send(`Usuario creado satisfactoriamente, id: ${created}`);
    } catch (error) {
        res.status(400).send('Ocurrió un error :( \n' + error.message);
    }
})

router.put('/:id', authenticateUser, isAdmin, async (req, res) => {
    const id_usuario = req.params.id;
    const changes = req.body;
    const updated = await updateUser(changes, id_usuario);
    if(updated == 1) {
        res.status(201).send(`Usuario con id ${id_usuario}, modificado satisfactoriamente!`);
    } else {
        res.status(400).send(`Ocurrió un problema :(`);
    }
})

module.exports = router;