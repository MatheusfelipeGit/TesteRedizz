import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Container, Typography, TextField, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [editPedido, setEditPedido] = useState(null);
  const [formData, setFormData] = useState({
    nomeCliente: '',
    cpfCliente: '',
    nomeProduto: '',
    precoProduto: ''
  });

  useEffect(() => {
    fetchPedidos();
  }, []);

  const fetchPedidos = async () => {
    try {
      const response = await axios.get('http://localhost:3033/Pedidos');
      setPedidos(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  const handleEdit = (pedido) => {
    setEditPedido(pedido.id);
    setFormData({
      nomeCliente: pedido.nomeCliente,
      cpfCliente: pedido.cpfCliente,
      nomeProduto: pedido.nomeProduto,
      precoProduto: pedido.precoProduto
    });
  };

  const handleUpdate = async () => {
    if (editPedido && formData.nomeCliente.trim() && formData.cpfCliente.trim() && formData.nomeProduto.trim() && formData.precoProduto && !isNaN(formData.precoProduto)) {
      try {
        const response = await axios.put('http://localhost:3033/Pedidos', { id: editPedido, ...formData });
        console.log('Resposta do servidor:', response.data);
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
      alert('Todos os campos são obrigatórios e preço deve ser um número válido');
    }
  };

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
      <Typography variant="h4" gutterBottom>Pedidos</Typography>

      {editPedido && (
        <div style={{ marginBottom: 16 }}>
          <TextField
            label="Nome do Cliente"
            variant="outlined"
            value={formData.nomeCliente}
            onChange={(e) => setFormData({ ...formData, nomeCliente: e.target.value })}
            style={{ marginRight: 8, marginBottom: 16 }}
            fullWidth
          />
          <TextField
            label="CPF do Cliente"
            variant="outlined"
            value={formData.cpfCliente}
            onChange={(e) => setFormData({ ...formData, cpfCliente: e.target.value })}
            style={{ marginRight: 8, marginBottom: 16 }}
            fullWidth
          />
          <TextField
            label="Nome do Produto"
            variant="outlined"
            value={formData.nomeProduto}
            onChange={(e) => setFormData({ ...formData, nomeProduto: e.target.value })}
            style={{ marginRight: 8, marginBottom: 16 }}
            fullWidth
          />
          <TextField
            label="Preço do Produto"
            variant="outlined"
            type="number"
            value={formData.precoProduto}
            onChange={(e) => setFormData({ ...formData, precoProduto: e.target.value })}
            style={{ marginRight: 8, marginBottom: 16 }}
            fullWidth
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Atualizar
          </Button>
        </div>
      )}

      <TableContainer component={Paper}>
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
                  <IconButton onClick={() => handleEdit(pedido)} style={{ marginRight: 8 }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(pedido.id)}>
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
