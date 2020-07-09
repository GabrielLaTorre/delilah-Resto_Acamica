const SQL = require('sql-template-strings');
const {Sequelize, User} = require('./db_connection');
const Op = Sequelize.Op;

async function getRegisteredUser(obj) {
    const {nombre_usuario, password} = obj;
    const userFound = await User.findOne({
        where: {
            [Op.and]: [
                {nombre_usuario: nombre_usuario},
                {password: password}
            ]
        }
    });
    return userFound;
}

async function getUser(username) {
    const userFound = await User.findOne({
        where: {
            nombre_usuario: username
        }
    });
    return userFound;
}

async function createUser(obj) {
    const userCreated = User.create(obj)
    return userCreated;
}

async function updateUser(obj,id) {
    const updatedUser = await User.update(obj, {
        where: {
            id_usuario: id
        }
    })
    return updateUser;
}

module.exports = { createUser, updateUser, getRegisteredUser, getUser }