import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Pedidos() {
  // State para armazenar a lista de pedidos
  const [pedidos, setPedidos] = useState([]);
  // State para armazenar o pedido que está sendo editado
  const [editPedido, setEditPedido] = useState(null);
  // State para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nomeCliente: '',
    cpfCliente: '',
    nomeProduto: '',
    precoProduto: ''
  });

  // Hook para buscar pedidos quando o componente é montado
  useEffect(() => {
    fetchPedidos();
  }, []);

  // Função para buscar os pedidos da API
  const fetchPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:3033/Pedidos');
      setPedidos(response.data); // Atualiza o estado com os pedidos recebidos
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  // Função para iniciar a edição de um pedido
  const handleEdit = (pedido) => {
    setEditPedido(pedido.id); // Define o pedido a ser editado
    setFormData({
      nomeCliente: pedido.nomeCliente,
      cpfCliente: pedido.cpfCliente,
      nomeProduto: pedido.nomeProduto,
      precoProduto: pedido.precoProduto
    });
  };

  // Função para atualizar o pedido
  const handleUpdate = async () => {
    if (editPedido && formData.nomeCliente.trim() && formData.cpfCliente.trim() && formData.nomeProduto.trim() && formData.precoProduto && !isNaN(formData.precoProduto)) {
      try {
        await axios.put('http://localhost:3033/Pedidos', { id: editPedido, ...formData });
        fetchPedidos(); // Atualiza a lista de pedidos
        setEditPedido(null); // Reseta o estado de edição
        setFormData({
          nomeCliente: '',
          cpfCliente: '',
          nomeProduto: '',
          precoProduto: ''
        });
        alert('Pedido atualizado com sucesso!');
      } catch (error) {
        console.error('Erro ao atualizar pedido:', error);
      }
    } else {
      alert('Todos os campos são obrigatórios e o preço deve ser um número válido.');
    }
  };

  // Função para deletar um pedido
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este pedido?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3033/Pedidos/${id}`);
        fetchPedidos(); // Atualiza a lista de pedidos
        alert('Pedido excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao deletar pedido:', error);
      }
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Pedidos
      </Typography>

      {/* Formulário de Edição de Pedido */}
      {editPedido && (
        <div className="edit-form">
          <TextField
            label="Nome do Cliente"
            variant="outlined"
            value={formData.nomeCliente}
            onChange={(e) => setFormData({ ...formData, nomeCliente: e.target.value })}
            fullWidth
            style={{ marginBottom: 20 }} // Espaço abaixo dos campos
          />
          <TextField
            label="CPF do Cliente"
            variant="outlined"
            value={formData.cpfCliente}
            onChange={(e) => setFormData({ ...formData, cpfCliente: e.target.value })}
            fullWidth
            style={{ marginBottom: 20 }} // Espaço abaixo dos campos
          />
          <TextField
            label="Nome do Produto"
            variant="outlined"
            value={formData.nomeProduto}
            onChange={(e) => setFormData({ ...formData, nomeProduto: e.target.value })}
            fullWidth
            style={{ marginBottom: 20 }} // Espaço abaixo dos campos
          />
          <TextField
            label="Preço do Produto"
            variant="outlined"
            type="number"
            value={formData.precoProduto}
            onChange={(e) => setFormData({ ...formData, precoProduto: e.target.value })}
            fullWidth
            InputProps={{
              classes: { input: 'no-spin-button' }
            }}
            style={{ marginBottom: 20 }} // Espaço abaixo dos campos
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            style={{ marginTop: 20 }} // Espaço acima do botão
          >
            Atualizar
          </Button>
        </div>
      )}

      {/* Tabela de Pedidos */}
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome do Cliente</TableCell>
              <TableCell>CPF do Cliente</TableCell>
              <TableCell>Nome do Produto</TableCell>
              <TableCell>Preço do Produto</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map(pedido => (
              <TableRow key={pedido.id}>
                <TableCell>{pedido.nomeCliente}</TableCell>
                <TableCell>{pedido.cpfCliente}</TableCell>
                <TableCell>{pedido.nomeProduto}</TableCell>
                <TableCell>{parseFloat(pedido.precoProduto).toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(pedido)} style={{ color: '#1976d2' }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(pedido.id)} style={{ color: '#d32f2f', marginLeft: 8 }}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Pedidos;
