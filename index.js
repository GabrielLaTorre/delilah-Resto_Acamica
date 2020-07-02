const express = require('express');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/delilah_resto');
const app = express();
const products = require('./server/products');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/products', products);

app.listen('3000', () => {
    console.log('Servidor Funcionando!');
})