const jwt = require('jsonwebtoken');
const jwtSignature = 'Delilah-Acamica2020';
const { getUser } = require('../database/u_querys');

async function validateUser(user) {
    const validatedUser = await getUser(user)
    if(!validatedUser) {
        return [null];
    }
    const userLogged = validatedUser.nombre_usuario;
    const msj = "HOLI"; // <-- Acá iria el JWT
    return [userLogged, msj];
}
module.exports = validateUser;