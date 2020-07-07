const jwt = require('jsonwebtoken');
const jwtSignature = 'Delilah-Acamica2020';
const uQuerys = require('../database/u_querys');

function validateUser(user) {
    const validatedUser = uQuerys.getUser(user);
    console.log(validateUser);
    return validatedUser;
}

module.exports = validateUser;