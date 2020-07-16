const Sequelize = require('sequelize');
const database = 'delilah_resto';
const username = 'root';
const password = 'root';

const sequelize = new Sequelize({
    database: database,
    username: username,
    password: password,
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
        type: Sequelize.INTEGER,
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

const Orders = sequelize.define('pedidos', {
    id_pedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    precio_total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    estado_pedido: {
        type: Sequelize.STRING,
        allowNull: false
    },
    metodo_pago: {
        type: Sequelize.STRING,
        allowNull: false
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: false
    },
    id_usuario_pedido: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id_usuario'
        }
    },
    fecha_pedido: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

const PxOrders = sequelize.define('platos_por_pedidos', {
    id_plato: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Products,
            key: 'id_plato'
        }
    },
    id_pedido: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Orders,
            key: 'id_pedido',
        }
    },
    cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

User.hasMany(Orders, {foreignKey: 'id_usuario_pedido'});
Orders.belongsTo(User, {foreignKey: 'id_usuario_pedido'});
Orders.belongsToMany(Products, {through: PxOrders, foreignKey: 'id_pedido'});
Products.belongsToMany(Orders, {through: PxOrders, foreignKey: 'id_plato'});

module.exports = { Sequelize, sequelize, User, Products, Orders, PxOrders };