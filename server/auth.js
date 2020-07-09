const jwt = require('jsonwebtoken');
const jwtSignature = 'Delilah-Acamica2020';
const { getRegisteredUser, getUser } = require('../database/u_querys');

async function validateUser(user) {
    const validatedUser = await getRegisteredUser(user)
    if(!validatedUser) {
        return [null];
    }
    const userLogged = validatedUser.nombre_usuario;
    const token = jwt.sign({
        userLogged
    }, jwtSignature);
    return [userLogged, token];
}

function authenticateUser(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const authenticated = jwt.verify(token, jwtSignature);
        if(authenticated){
            req.usuario = authenticated;
            return next();
        }
    } catch (err) {
        res.status(403).send(`Error al validar usuario: ${err.message}`);
    }
};

async function isAdmin(req, res, next) {
        const {userLogged} = req.usuario;
        const {es_admin} = await getUser(userLogged)
        if(es_admin == 1) {
            return next();
        }
        else {
            res.status(403).send('No dispones de permisos de Administrador!');
            return false;
        }
}

module.exports = { validateUser, authenticateUser, isAdmin};