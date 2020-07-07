const SQL = require('sql-template-strings');
const {sequelize, User} = require('./db_connection');


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

module.exports = {
    createUser: createUser,
    updatedUser: updateUser
}