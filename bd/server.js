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

// Rota para obter todos os pedidos
app.get('/Pedidos', (req, res) => {
  const sql = 'SELECT * FROM Pedidos';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    res.json(results);
  });
});

// Rota para adicionar um novo pedido
app.post('/Pedidos', (req, res) => {
  const { nomeCliente, cpfCliente, nomeProduto, precoProduto } = req.body;
  if (!nomeCliente || !cpfCliente || !nomeProduto || precoProduto == null) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }
  const sql = 'INSERT INTO Pedidos (nomeCliente, cpfCliente, nomeProduto, precoProduto) VALUES (?, ?, ?, ?)';
  db.query(sql, [nomeCliente, cpfCliente, nomeProduto, precoProduto], (err, results) => {
    if (err) {
      console.error('Erro ao executar o insert:', err);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    res.json({ nomeCliente, cpfCliente, nomeProduto, precoProduto });
  });
});

// Rota para atualizar um pedido existente
app.put('/Pedidos', (req, res) => {
  const { id, nomeCliente, cpfCliente, nomeProduto, precoProduto } = req.body;
  if (!id || !nomeCliente || !cpfCliente || !nomeProduto || precoProduto == null) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }
  const sql = 'UPDATE Pedidos SET nomeCliente = ?, cpfCliente = ?, nomeProduto = ?, precoProduto = ? WHERE id = ?';
  db.query(sql, [nomeCliente, cpfCliente, nomeProduto, precoProduto, id], (err, results) => {
    if (err) {
      console.error('Erro ao executar o update:', err);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    res.json({ id, nomeCliente, cpfCliente, nomeProduto, precoProduto });
  });
});

// Rota para excluir um pedido
app.delete('/Pedidos/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send('ID do pedido é obrigatório');
  }
  const sql = 'DELETE FROM Pedidos WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Erro ao executar o delete:', err);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    res.send('Pedido excluído com sucesso');
  });
});

const porta = 3033;
app.listen(porta, () => console.log(`Servidor rodando na porta ${porta}`));
