const {Router} = require('express');
const router = Router();
const {createUser, updateUser} = require('../database/u_querys');
const { validateUser, isAdmin, authenticateUser } = require('./auth');

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
    const created = await createUser(newUser);
    if(created){
        res.status(201).send(`Usuario creado satisfactoriamente, id: ${created}`);
    } else {
        res.status(400).send('Ocurrió un error :(');
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