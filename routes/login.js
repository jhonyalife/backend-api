const express = require("express");
const jwt = require('jsonwebtoken')
const login = express.Router()

// Metodo de autenticação 

login.post('/login', (req,res) =>{
    if(req.body.usuario === 'luiz' && req.body.senha === '123'){
      const id = 1;
      const nome = 'Luiz Ferreira'
      const grupo = "Gerente"
      const token = jwt.sign({id,nome,grupo}, process.env.SENHA, {
        expiresIn: 60 * 10 // Expires in 5min (300 segundos ==> 5 x 60)
      });
      return res.json({auth: true, token: token})
    } else{
      res.status(403).json({message: 'Login inválido!'})
    }
  });
  
  function verificarToken(req,res, next) {
    const token = req.headers['x-acess-token'];
    if(!token){
      return res.status(401).json({auth: false, message: "Nenhum token de autenticação informado"})
    } else{
      jwt.verify(token, process.env.SENHA, function(err, decoded){
        if(erro){
          return res.status(500).json({auth: false, message: 'Token inválido'})
        }
        console.log('Metodo acessado por' + decoded.nome)
        next();
      })
    }
  }

module.exports = login, verificarToken;