import './mui.css';
import Home from './components/Pedidos';
import Produtos from './components/CadastroGeral';
import Sobre from './components/Sobre';

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function App() {
  return (
    <div className="App">
      <h1>REACT com CRUD</h1>
      <BrowserRouter>
        <Stack spacing={2} direction="row">
          <Button component={Link} to="/" variant="contained">Pedidos</Button>
          <Button component={Link} to="/Produtos" variant="contained">Cadastros</Button>
          
          <Button component={Link} to="/Sobre" variant="contained">Sobre</Button>
        </Stack>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Produtos" element={<Produtos />} />
          <Route path="/Sobre" element={<Sobre />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
