const Sequelize = require('sequelize');

const database = 'delilah_resto';
const username = 'root';
const password = 'root';

const sequelize = new Sequelize(database, username, password, {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

sequelize.authenticate()
.then(() => console.log('Conexión establecida exitosamente!' ))
.catch(err => console.log(err))

const User = sequelize.define('usuarios', {
    id_usuario: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nombre_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    nombre_apellido: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefono: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    es_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
});

const Products = sequelize.define('platos', {
    id_plato: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    nombre_plato: {
        type: Sequelize.STRING,
        allowNull: false
    },
    precio_plato: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

sequelize.sync()


module.exports = {
    sequelize: sequelize,
    User: User,
    Products: Products
}