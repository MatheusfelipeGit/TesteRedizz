const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'TesteCRUD'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  }
  console.log('Conectado ao MySQL');
});

// Rota para obter todos os produtos
app.get('/Produtos', (req, res) => {
  const sql = 'SELECT * FROM Produtos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).send('Erro interno do servidor');
    }
    res.json(results);
  });
});

// Rota para adicionar um novo produto
app.post('/Produtos', (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || preco === undefined) {
    return res.status(400).send('Nome e preço são obrigatórios');
  }
  const sql = 'INSERT INTO Produtos (nome, preco) VALUES (?, ?)';
  db.query(sql, [nome, preco], (err, results) => {
    if (err) {
      console.error('Erro ao executar o insert:', err);
      return res.status(500).send('Erro interno do servidor');
    }
    res.json({ id: results.insertId, nome, preco });
  });
});

// Rota para atualizar um produto existente
app.put('/Produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  if (!id || !nome || preco === undefined) {
    return res.status(400).send('ID, nome e preço são obrigatórios');
  }
  const sql = 'UPDATE Produtos SET nome = ?, preco = ? WHERE id = ?';
  db.query(sql, [nome, preco, id], (err, results) => {
    if (err) {
      console.error('Erro ao executar o update:', err);
      return res.status(500).send('Erro interno do servidor');
    }
    res.send('Produto atualizado com sucesso');
  });
});

// Rota para excluir um produto
app.delete('/Produtos/:id', (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send('ID é obrigatório');
  }
  const sql = 'DELETE FROM Produtos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao executar o delete:', err);
      return res.status(500).send('Erro interno do servidor');
    }
    res.send('Produto deletado com sucesso');
  });
});

const porta = 3034;
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
