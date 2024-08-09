import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

function Pedidos() {
  const [nomeCliente, setNomeCliente] = useState('');
  const [cpfCliente, setCpfCliente] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');

  const handleAdd = async () => {
    if (nomeCliente.trim() && cpfCliente.trim() && nomeProduto.trim() && precoProduto && !isNaN(precoProduto)) {
      try {
        await axios.post('http://localhost:3033/Pedidos', {
          nomeCliente,
          cpfCliente,
          nomeProduto,
          precoProduto: parseFloat(precoProduto)
        });
        // Limpa os campos após o cadastro
        setNomeCliente('');
        setCpfCliente('');
        setNomeProduto('');
        setPrecoProduto('');
        alert('Pedido cadastrado com sucesso!');
      } catch (error) {
        console.error('Erro ao adicionar pedido:', error);
      }
    } else {
      alert('Todos os campos são obrigatórios e preço deve ser um número válido');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Cadastro de Pedidos</Typography>
      
      <TextField
        label="Nome do Cliente"
        variant="outlined"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
        style={{ marginRight: 8, marginBottom: 16 }}
        fullWidth
      />
      <TextField
        label="CPF do Cliente"
        variant="outlined"
        value={cpfCliente}
        onChange={(e) => setCpfCliente(e.target.value)}
        style={{ marginRight: 8, marginBottom: 16 }}
        fullWidth
      />
      <TextField
        label="Nome do Produto"
        variant="outlined"
        value={nomeProduto}
        onChange={(e) => setNomeProduto(e.target.value)}
        style={{ marginRight: 8, marginBottom: 16 }}
        fullWidth
      />
      <TextField
        label="Preço do Produto"
        variant="outlined"
        type="number"
        value={precoProduto}
        onChange={(e) => setPrecoProduto(e.target.value)}
        style={{ marginRight: 8, marginBottom: 16 }}
        fullWidth
      />

      <Button variant="contained" color="primary" onClick={handleAdd}>
        Cadastrar Pedido
      </Button>
    </Container>
  );
}

export default Pedidos;
