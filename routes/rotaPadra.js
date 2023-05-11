const express = require("express");
const rotaPadrao = express.Router();
const con = require('../db/db')

rotaPadrao.get('/', (req,res) => {
    res.send('Hello World ')
  })

module.exports = rotaPadrao;