const express = require('express');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/delilah_resto');

const app = express();

sequelize.query('SELECT * FROM usuarios', { type: sequelize.QueryTypes.SELECT})
.then( res => console.log(res))

app.listen('3000', () => {
    console.log('Servidor Funcionando!');
})