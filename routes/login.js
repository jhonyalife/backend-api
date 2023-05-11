const express = require("express");
const jwt = require('jsonwebtoken')
const login = express.Router()
require('dotenv').config();

// Metodo de autenticação 

login.post('/', (req, res) => {
  const idOperador = req.body.idoperador;
  const noOperador = req.body.nooperador;
  const sql = 'SELECT * FROM tboperador WHERE IdOperador = ? AND NoOperador = ?';
  con.query(sql, [idOperador, noOperador], (erroComandoSQL, result, fields) => {
    if (erroComandoSQL) {
      throw erroComandoSQL;
    } else {
      if (result.length > 0) {
        //const nome = result[0].NoOperador;
        const token = jwt.sign({ idOperador, noOperador }, process.env.SENHA, {
          expiresIn: 60 * 10, // expires in 5min (300 segundos ==> 5 x 60)
        });
        res.json({ auth: true, token: token });
      } else {
        res.status(403).json({ message: 'Login inválido!' });
      }
    }
  });
});

function verificarToken(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) {
    res.status(401).json({
      auth: false,
      message: 'Nenhum token de autenticação informado.',
    });
  } else {
    jwt.verify(token, process.env.SENHA, function (err, decoded) {
      if (err) {
        res.status(500).json({ auth: false, message: 'Token inválido.' });
      } else {
        console.log('Metodo acessado por ' + decoded.nome);
        next();
      }
    });
  }
}

module.exports = login
module.exports.verificarToken = verificarToken;