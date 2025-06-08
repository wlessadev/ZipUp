import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import styles from '../styles/Cadastro.module.css';

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
  const [dataError, setDataError] = useState({
    futuro: false,
    muitoAntiga: false
  });
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [cepError, setCepError] = useState(false);
  const [mostrarResumo, setMostrarResumo] = useState(false);
  const router = useRouter();

  const formatarCelularInput = (value) => {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 2) return nums;
    if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
  };

  const formatarCEPInput = (value) => {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 5) return nums;
    return `${nums.slice(0, 5)}-${nums.slice(5, 8)}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    if (name === 'celular') {
      formattedValue = formatarCelularInput(value);
    }
    
    if (name === 'dataNascimento') {
      const hoje = new Date();
      const dataNasc = new Date(value);
      const idade = hoje.getFullYear() - dataNasc.getFullYear();
      
      setDataError({
        futuro: dataNasc > hoje,
        muitoAntiga: idade > 150
      });
    }
    
    setForm(prev => ({ ...prev, [name]: formattedValue }));
  };

  const fetchCEP = async (cep) => {
    if (cep.length !== 8) return;
    
    setLoadingCEP(true);
    setCepError(false);
    
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
        setCepError(true);
        console.log('CEP não encontrado');
      }
    } catch (error) {
      setCepError(true);
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setLoadingCEP(false);
    }
  };

  const handleCEPChange = (e) => {
    const value = e.target.value;
    const cepNumeros = value.replace(/\D/g, '');
    const cepFormatado = cepNumeros.length > 5 
      ? `${cepNumeros.slice(0, 5)}-${cepNumeros.slice(5, 8)}` 
      : cepNumeros;
    
    setForm(prev => ({ ...prev, cep: cepFormatado }));
    
    if (cepNumeros.length === 8) {
      fetchCEP(cepNumeros);
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
    <Container maxWidth="100vw" className={styles.container}>
      <Box className={styles.contentBox}>
        <Typography variant="h3" gutterBottom className={styles.title}>
          Cadastro de Usuário
        </Typography>

        {!mostrarResumo ? (
          <form onSubmit={handleContinue}>
            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Nome Completo"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Data de Nascimento"
                  name="dataNascimento"
                  type="date"
                  value={form.dataNascimento}
                  onChange={handleChange}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                  helperText={
                    dataError.futuro 
                      ? <span className={styles.errorText}>Data não pode ser no futuro</span>
                      : dataError.muitoAntiga
                        ? <span className={styles.errorText}>Idade máxima permitida é 150 anos</span>
                        : ''
                  }
                  inputProps={{
                    max: new Date().toISOString().split('T')[0],
                    min: new Date(new Date().getFullYear() - 150, 0, 1).toISOString().split('T')[0]
                  }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
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
                  inputProps={{ maxLength: 15 }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12}>
                <Box className={styles.cepContainer}>
                  <TextField
                    label="CEP"
                    name="cep"
                    value={form.cep}
                    onChange={handleCEPChange}
                    fullWidth
                    required
                    inputProps={{ maxLength: 9 }}
                    helperText={
                      loadingCEP 
                        ? 'Buscando endereço...' 
                        : cepError 
                            ? <span className={styles.errorText}>Não foi possível encontrar o CEP informado</span> 
                            : ''
                    }
                    InputProps={{
                      endAdornment: loadingCEP ? <CircularProgress size={20} /> : null
                    }}
                    sx={{ flex: 1 }}
                  />
                  <Button 
                    variant="text" 
                    color="primary"
                    size="small"
                    onClick={() => window.open('https://buscacepinter.correios.com.br/app/endereco/index.php', '_blank')}
                    className={styles.cepButton}
                  >
                    Não sabe seu CEP? Clique aqui!
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={8} md={6}>
                <TextField
                  label="Endereço"
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    readOnly: true,
                    sx: { pointerEvents: 'none' }
                  }}
                  className={styles.readOnlyInput}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <TextField
                  label="Número"
                  name="numero"
                  value={form.numero}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    setForm(prev => ({ ...prev, numero: value }));
                  }}
                  fullWidth
                  required
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
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
                  InputProps={{
                    readOnly: true,
                    sx: { pointerEvents: 'none' }
                  }}
                  className={styles.readOnlyInput}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={8}>
                <TextField
                  label="Cidade"
                  name="cidade"
                  value={form.cidade}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    readOnly: true,
                    sx: { pointerEvents: 'none' }
                  }}
                  className={styles.readOnlyInput}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="UF"
                  name="uf"
                  value={form.uf}
                  onChange={handleChange}
                  fullWidth
                  required
                  InputProps={{
                    readOnly: true,
                    sx: { pointerEvents: 'none' }
                  }}
                  className={styles.readOnlyInput}
                />
              </Grid>
            </Grid>

            <Box className={styles.buttonGroup}>
              <Button 
                variant="outlined" 
                color="secondary" 
                onClick={handleBack}
                className={styles.button}
              >
                Voltar
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                className={styles.button}
              >
                Continuar
              </Button>
            </Box>
          </form>
        ) : (
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h5" className={styles.resumeTitle}>
              Resumo dos dados:
            </Typography>
            
            <Box className={styles.resumeBox}>
              {Object.entries(form).map(([key, value]) => {
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

                const formatarNome = (nome) => {
                  if (!nome) return 'Não informado';
                  
                  const particulas = [
                    'de', 'da', 'das', 'do', 'dos', 'e',
                    'van', 'von', 'der', 'den', 'ten', 'ter',
                    'di', 'dei', 'del', 'della', 'delle', 'degli',
                    'de', 'des', 'du', 'd\'',
                    'y', 'del', 'de', 'las', 'los',
                    'die', 'das', 'und', 'zu', 'van den', 'van der'
                  ];
                  
                  return nome
                    .toLowerCase()
                    .split(' ')
                    .map((palavra, index) => {
                      if (index !== 0 && particulas.includes(palavra.toLowerCase())) {
                        return palavra.toLowerCase();
                      }
                      return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
                    })
                    .join(' ');
                };

                const formatarCelular = (cel) => {
                  if (!cel) return 'Não informado';
                  const celular = cel.replace(/\D/g, '');
                  return celular.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                };

                const formatarData = (data) => {
                  if (!data) return 'Não informado';
                  const [year, month, day] = data.split('-');
                  return `${day}/${month}/${year}`;
                };

                const formatarCEP = (cep) => {
                  if (!cep) return 'Não informado';
                  const cepFormatado = cep.replace(/\D/g, '');
                  return cepFormatado.replace(/(\d{5})(\d{3})/, '$1-$2');
                };

                let valorFormatado = value || 'Não informado';
                
                if (key === 'nome') {
                  valorFormatado = formatarNome(value);
                } else if (key === 'celular') {
                  valorFormatado = formatarCelular(value);
                } else if (key === 'dataNascimento') {
                  valorFormatado = formatarData(value);
                } else if (key === 'cep') {
                  valorFormatado = formatarCEP(value);
                }

                return (
                  <Typography key={key} className={styles.resumeItem}>
                    <Box component="span" className={styles.resumeLabel}>
                      {labels[key] || key}:
                    </Box> <Box component="span" className={styles.resumeValue}>{valorFormatado}</Box>
                  </Typography>
                );
              })}
            </Box>
            
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleBack}
              className={styles.button}
            >
              Voltar
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}