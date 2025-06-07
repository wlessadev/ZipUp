import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Paper, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    dataNascimento: '',
    celular: '',
    cep: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: ''
  });
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [mostrarResumo, setMostrarResumo] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const fetchCEP = async (cep) => {
    if (cep.length !== 8) return;
    
    setLoadingCEP(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setForm(prev => ({
          ...prev,
          endereco: data.logradouro || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          uf: data.uf || ''
        }));
      } else {
            console.log('CEP não encontrado');
        }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setLoadingCEP(false);
    }
  };

  const handleCEPChange = (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    handleChange({ target: { name: 'cep', value: cep } });
    
    // Busca automática quando CEP está completo
    if (cep.length === 8) {
      fetchCEP(cep);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setMostrarResumo(true);
  };

  const handleBack = () => {
    mostrarResumo ? setMostrarResumo(false) : router.push('/');
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h4" gutterBottom>Cadastro de Usuário</Typography>

      {!mostrarResumo ? (
        <form onSubmit={handleContinue}>
          <TextField
            label="Nome Completo"
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
            label="Data de Nascimento"
            name="dataNascimento"
            type="date"
            value={form.dataNascimento}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Celular"
            name="celular"
            value={form.celular}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="CEP"
            name="cep"
            value={form.cep}
            onChange={handleCEPChange}
            fullWidth
            margin="normal"
            required
            inputProps={{ maxLength: 9 }}
            helperText={loadingCEP && 'Buscando endereço...'}
            InputProps={{
              endAdornment: loadingCEP ? <CircularProgress size={20} /> : null
            }}
          />
          <TextField
            label="Endereço"
            name="endereco"
            value={form.endereco}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Número"
            name="numero"
            value={form.numero}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Bairro"
            name="bairro"
            value={form.bairro}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Cidade"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="UF"
            name="uf"
            value={form.uf}
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
              Continuar
            </Button>
          </Box>
        </form>
      ) : (
        <>
          <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
            <Typography variant="h6">Resumo dos dados:</Typography>
            {Object.entries(form).map(([key, value]) => (
              <Typography key={key}><strong>{key}:</strong> {value}</Typography>
            ))}
          </Paper>
          <Button variant="outlined" color="secondary" sx={{ marginTop: 3 }} onClick={handleBack}>
            Voltar
          </Button>
        </>
      )}
    </Box>
  );
}