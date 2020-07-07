const {Router} = require('express');
const router = Router();
const {createUser, updatedUser} = require('../database/u_querys');

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