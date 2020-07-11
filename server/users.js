const {Router} = require('express');
const router = Router();
const {createUser, updateUser} = require('../database/u_querys');
const { validateUser } = require('./auth');

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

router.post('/register', (req, res) => {
    const newUser = req.body;
    const created = createUser(newUser);
    created
    .then(user => res.status(201).send(user))
    .catch(err => console.log(err))
})

router.put('/:id', (req, res) => {
    const id_usuario = req.params.id;
    const changes = req.body;
    console.log(changes);
    const updated = updateUser(changes, id_usuario);
    updated
    .then(() => res.status(200).send(`Usuario con id ${id_usuario}, modificado exitosamente!`))
    .catch(err => console.log(err))
})

module.exports = router;