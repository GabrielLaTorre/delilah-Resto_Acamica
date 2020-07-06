const {Router} = require('express');
const router = Router();
const uQuery = require('../database/u_querys');

router.post('/register', (req, res) => {
    const newUser = req.body;
    const userCreated = uQuery.createUser(newUser);
    userCreated
    .then(user => res.status(201).send(user))
    .catch(err => console.log(err))
})

module.exports = router;