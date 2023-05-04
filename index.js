const express = require("express");
const autor = require('./routes/autor')
const login = require('./routes/login')
const app = express();
require('dotenv').config();

app.use(express.json())
app.use('/', autor)
app.use('/', login)


app.listen(process.env.PORT, () => {
  console.log(`Sucess running services port ${process.env.PORT}` )  
})