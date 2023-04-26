const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

app.use(express.json())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbbiblioteca",
});

con.connect((err) => {
  if (err) {
    throw err;
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/alunos", (req, res) => {
  res.send('{"nome":"Marcelo"}');
});

app.post("/alunos", (req, res) => {
  res.send("Executou um post");
});

app.get("/alunos/:id", (req, res) => {
  const id = req.params.id;
  if (id <= 10) {
    res.status(200).send("Aluno localizado com sucesso");
  } else {
    res.status(404).send("Aluno não encontrado");
  }
});

app.get("/autor", (req, res) => {
  con.query("SELECT * FROM tbAutor", (err, result, fields) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).send(result);
  });
});

app.get("/autor/:id", (req, res) => {
  const idAutor = req.params.id;
  const sql =
    "SELECT * FROM tbAutor INNER JOIN tbNacionalidade ON tbAutor.IdNacionalidade = TbNacionalidade.IdNacionalidade WHERE IdAutor = ?";
  con.query(sql, [idAutor], (err, result, fields) => {
    if (err) {
      throw err;
    }
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(404).send("Não encontrado");
    }
  });
});

app.delete("/autor/:id", (req, res) => {
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

app.post("/autor", (req, res) => {
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

app.put('/autor/:id', (req, res) => {
  const idautor = req.params.id;
  const noautor = req.body.noautor;
  const idnacionalidade = req.body.idnacionalidade;

  const sql = 'UPDATE tbAutor SET NoAutor = ?, IdNacionalidade = ? WHERE IdAutor = ?'
  con.query(sql, [noautor, idnacionalidade, idautor], (erroUpdate, result) => {
    if(erroUpdate){
      throw erroUpdate;
    }
    if(result.affectedRows > 0){
      res.status(200).send('Registro alterado com sucesso')
    } else {
      res.status(404).send('Registro não encontrado')
      console.log('estou aqui')
    }
  })
})

app.listen(port, () => {
  console.log(`Sucess running services port ${port}` )
})