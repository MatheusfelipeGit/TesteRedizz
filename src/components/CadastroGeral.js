import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography } from '@mui/material';

function Pedidos() {
  // Estados para armazenar os dados do formulário
  const [nomeCliente, setNomeCliente] = useState('');
  const [cpfCliente, setCpfCliente] = useState('');
  const [nomeProduto, setNomeProduto] = useState('');
  const [precoProduto, setPrecoProduto] = useState('');

  // Função para adicionar um novo pedido
  const handleAdd = async () => {
    // Verifica se todos os campos estão preenchidos e o preço é um número válido
    if (nomeCliente.trim() && cpfCliente.trim() && nomeProduto.trim() && precoProduto && !isNaN(precoProduto)) {
      try {
        // Envia uma solicitação POST para a API para adicionar o pedido
        await axios.post('http://localhost:3033/Pedidos', {
          nomeCliente,
          cpfCliente,
          nomeProduto,
          precoProduto: parseFloat(precoProduto) // Converte o preço para número
        });
        // Limpa os campos após o cadastro bem-sucedido
        setNomeCliente('');
        setCpfCliente('');
        setNomeProduto('');
        setPrecoProduto('');
        alert('Pedido cadastrado com sucesso!'); // Alerta para sucesso
      } catch (error) {
        // Exibe um erro no console se houver um problema ao adicionar o pedido
        console.error('Erro ao adicionar pedido:', error);
      }
    } else {
      // Exibe um alerta se algum campo estiver vazio ou se o preço não for válido
      alert('Todos os campos são obrigatórios e preço deve ser um número válido');
    }
  };

  return (
    <Container>
      {/* Título da página */}
      <Typography variant="h4" gutterBottom>Cadastro de Pedidos</Typography>

      {/* Campo para nome do cliente */}
      <TextField
        label="Nome do Cliente"
        variant="outlined"
        value={nomeCliente}
        onChange={(e) => setNomeCliente(e.target.value)}
        style={{ marginRight: 8, marginBottom: 16 }}
        fullWidth
      />
      {/* Campo para CPF do cliente */}
      <TextField
        label="CPF do Cliente"
        variant="outlined"
        value={cpfCliente}
        onChange={(e) => setCpfCliente(e.target.value)}
        style={{ marginRight: 8, marginBottom: 16 }}
        fullWidth
      />
      {/* Campo para nome do produto */}
      <TextField
        label="Nome do Produto"
        variant="outlined"
        value={nomeProduto}
        onChange={(e) => setNomeProduto(e.target.value)}
        style={{ marginRight: 8, marginBottom: 16 }}
        fullWidth
      />
      {/* Campo para preço do produto */}
      <TextField
        label="Preço do Produto"
        variant="outlined"
        type="number"
        value={precoProduto}
        onChange={(e) => setPrecoProduto(e.target.value)}
        style={{ marginRight: 8, marginBottom: 16 }}
        fullWidth
      />

      {/* Botão para cadastrar o pedido */}
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Cadastrar Pedido
      </Button>
    </Container>
  );
}

export default Pedidos;
