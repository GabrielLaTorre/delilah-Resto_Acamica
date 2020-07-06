const express = require('express');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/delilah_resto');
const products = require('./server/products');
const users = require('./server/users');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use('/products', products);
app.use('/users', users);

app.listen('3000', () => {
    console.log('Servidor Funcionando!');
})