const SQL = require('sql-template-strings');
const {Sequelize, sequelize, User} = require('./db_connection');
const Op = Sequelize.Op;

async function getUser(obj) {
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

module.exports = { createUser, updateUser, getUser }