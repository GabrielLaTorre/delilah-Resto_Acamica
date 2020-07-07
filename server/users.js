const {Router} = require('express');
const router = Router();
const {createUser, updatedUser, getUser} = require('../database/u_querys');
const validateUser = require('./auth');

router.post('/login', (req, res) => {
    const userLogin = req.body;
    userFound = validateUser(userLogin);
    userFound
    .then(user => res.status(200).send(`Bienvenido ${user}!`))
    .catch(err => console.log(err))
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
    const updated = updatedUser(changes, id_usuario);
    updated
    .then(() => res.status(200).send(`Usuario con id ${id_usuario}, modificado exitosamente!`))
    .catch(err => console.log(err))
})

module.exports = router;