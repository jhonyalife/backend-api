const express = require("express");
const app = express();
const porta = 3001
const autor = require('./routes/autor')
const login = require('./routes/login')
const editora = require('./routes/editora')
const rotaPadrao = require('./routes/rotaPadra')
require('dotenv').config();

app.use(express.json())
app.use('/', rotaPadrao)
app.use('/autor', autor)
app.use('/login', login)
app.use('/editora', editora)


app.listen(porta, () => {
  console.log(`Sucess running services port ${porta}` )  
})