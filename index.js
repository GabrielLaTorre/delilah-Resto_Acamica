const express = require('express');
const products = require('./server/products');
const users = require('./server/users');
const orders = require('./server/orders');
const bodyParser = require('body-parser');
const app = express();
const CORS = require('cors');

app.use(bodyParser.json(), CORS());
app.use('/products', products);
app.use('/users', users);
app.use('/orders', orders);

app.listen('3000', () => {
    console.log('Servidor Funcionando!');
})