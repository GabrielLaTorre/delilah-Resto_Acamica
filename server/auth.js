const jwt = require('jsonwebtoken');
const jwtSignature = 'Delilah-Acamica2020';
const uQuerys = require('../database/u_querys');

async function validateUser(user) {
    const validatedUser = await uQuerys.getUser(user)
    if(!validatedUser) {
        return 'Usuario inexistente'
    }
    const userLogged = await validatedUser.nombre_usuario;
    console.log(userLogged);
    return userLogged;
}
module.exports = validateUser;