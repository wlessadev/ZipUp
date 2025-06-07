// pages/cadastro.js
import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cep: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados enviados:', form);
    // Redireciona para a home após o envio
    router.push('/');
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Usuário
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="CEP"
          name="cep"
          value={form.cep}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="outlined" color="secondary" onClick={handleBack}>
            Voltar
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
}