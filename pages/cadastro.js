// pages/cadastro.js
import { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useRouter } from 'next/router';

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cep: '',
  });

  const [mostrarResumo, setMostrarResumo] = useState(false); // Controla se mostra o resumo ou o formulário

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setMostrarResumo(true);
  };

  const handleBack = () => {
    if (mostrarResumo) {
      setMostrarResumo(false); // Volta para o formulário
    } else {
      router.push('/'); // Volta para a home
    }
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Usuário
      </Typography>

      {!mostrarResumo ? (
        <form onSubmit={handleContinue}>
          <TextField
            label="Nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="E-mail"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CEP"
            name="cep"
            value={form.cep}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Button variant="outlined" color="secondary" onClick={handleBack}>
              Voltar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Continuar
            </Button>
          </Box>
        </form>
      ) : (
        <>
          <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
            <Typography variant="h6">Resumo dos dados:</Typography>
            <Typography><strong>Nome:</strong> {form.nome}</Typography>
            <Typography><strong>E-mail:</strong> {form.email}</Typography>
            <Typography><strong>CEP:</strong> {form.cep}</Typography>
          </Paper>

          <Button
            variant="outlined"
            color="secondary"
            sx={{ marginTop: 3 }}
            onClick={handleBack}
          >
            Voltar
          </Button>
        </>
      )}
    </Box>
  );
}
