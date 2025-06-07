import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CircularProgress, Grid } from '@mui/material';
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
    <Container maxWidth="100vw" sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      padding: 4
    }}>
      <Box sx={{ 
        textAlign: 'center',
        width: '100%',
        maxWidth: 800,
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: 'white'
      }}>
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: 'black',
            marginBottom: 4
          }}
        >
          Cadastro de Usuário
        </Typography>

        {!mostrarResumo ? (
          <form onSubmit={handleContinue}>
            {/* Linha 1: Nome completo */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Nome Completo"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            {/* Linha 2: Email e Celular */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="E-mail"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Celular"
                  name="celular"
                  value={form.celular}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            {/* Linha 3: Data de Nascimento */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="Data de Nascimento"
                  name="dataNascimento"
                  type="date"
                  value={form.dataNascimento}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
            </Grid>

            {/* Linha 4: CEP */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12}>
                <TextField
                  label="CEP"
                  name="cep"
                  value={form.cep}
                  onChange={handleCEPChange}
                  fullWidth
                  required
                  inputProps={{ maxLength: 9 }}
                  helperText={loadingCEP && 'Buscando endereço...'}
                  InputProps={{
                    endAdornment: loadingCEP ? <CircularProgress size={20} /> : null
                  }}
                />
              </Grid>
            </Grid>

            {/* Linha 5: Endereço, Número e Bairro */}
            <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <TextField
                    label="Endereço"
                    name="endereco"
                    value={form.endereco}
                    onChange={handleChange}
                    fullWidth
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    <TextField
                    label="Número"
                    name="numero"
                    value={form.numero}
                    onChange={handleChange}
                    fullWidth
                    required
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <TextField
                    label="Bairro"
                    name="bairro"
                    value={form.bairro}
                    onChange={handleChange}
                    fullWidth
                    required
                    />
                </Grid>
            </Grid>

            {/* Linha 6: Cidade e UF */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Cidade"
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="UF"
                  name="UF"
                  value={form.uf}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
            </Grid>

            {/* Botões */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={handleBack}
                sx={{
                  padding: '12px 32px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: 1
                }}
              >
                Voltar
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                sx={{
                  padding: '12px 32px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  borderRadius: 1
                }}
              >
                Continuar
              </Button>
            </Box>
          </form>
        ) : (
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'black' }}>
              Resumo dos dados:
            </Typography>
            
            <Box sx={{ 
              p: 3, 
              mb: 3,
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: 'background.paper'
            }}>
              {Object.entries(form).map(([key, value]) => {
                // Mapeamento dos rótulos
                const labels = {
                    nome: 'Nome',
                    email: 'E-mail',
                    dataNascimento: 'Data de Nascimento',
                    celular: 'Celular',
                    cep: 'CEP',
                    endereco: 'Endereço',
                    numero: 'Número',
                    bairro: 'Bairro',
                    cidade: 'Cidade',
                    uf: 'UF'
                };

                return (
                    <Typography key={key} sx={{ mb: 1 }}>
                    <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                        {labels[key] || key}: {/* Usa o rótulo mapeado ou a chave original */}
                    </Box> <Box component="span" sx={{ color: 'black' }}>{value || 'Não informado'}</Box>
                    </Typography>
                );
                })}
            </Box>
            
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleBack}
              sx={{
                padding: '12px 32px',
                fontSize: '1rem',
                fontWeight: 'bold',
                borderRadius: 1
              }}
            >
              Voltar
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}