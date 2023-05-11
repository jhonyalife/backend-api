const express = require("express");
const autor = express.Router();
const con = require('../db/db')
const login = require('./login')
require('dotenv').config();


autor.get('/', (req, res) => {
  const sql = "SELECT * FROM tbAutor";
  con.query(sql, (err, result, fields) => {
    if (err) {
      throw err;
    }
    res.status(200).send(result)

  })
})

autor.get('/', login.verificarToken, (req, res) => {
  con.query('SELECT * FROM tbAutor', (erroComandoSQL, result, fields) => {
    if (erroComandoSQL) {
      throw erroComandoSQL;
    }
    res.status(200).send(result);
  });
});

autor.delete("/:id", (req, res) => {
  const idAutor = req.params.id;
  const sql = "DELETE FROM tbAutor WHERE IdAutor = ?";

  con.query(sql, [idAutor], (err, result, fields) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows > 0) {
      res.status(200).send("Registro excluido com sucesso");
    } else {
      res.status(404).send("Não encontrado");
    }
  });
});

autor.post("/", (req, res) => {
  const idautor = req.body.idautor;
  const noautor = req.body.noautor;
  const IdNacionalidade = req.body.idnacionalidade;

  const sql = "INSERT INTO tbautor (IdAutor ,NoAutor, IdNacionalidade) VALUES (?, ?, ?)";
  con.query(sql, [idautor, noautor, IdNacionalidade], (err, result, fields) => {
    if (err) {
      throw err;
    }
    if (result.affectedRows > 0) {
      res.status(200).send("Registro incluido com sucesso");
    } else {
      res.status(400).send("Erro ao incluir o registro");
    }
  });
});

autor.put('/:id', (req, res) => {
  const idautor = req.params.id;
  const noautor = req.body.noautor;
  const idnacionalidade = req.body.idnacionalidade;

  const sql = 'UPDATE tbAutor SET NoAutor = ?, IdNacionalidade = ? WHERE IdAutor = ?'
  con.query(sql, [noautor, idnacionalidade, idautor], (erroUpdate, result) => {
    if (erroUpdate) {
      throw erroUpdate;
    }
    if (result.affectedRows > 0) {
      res.status(200).send('Registro alterado com sucesso')
    } else {
      res.status(404).send('Registro não encontrado')
      console.log('estou aqui')
    }
  })
})

module.exports = autor;