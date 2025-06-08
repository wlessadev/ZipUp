import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { TextField, Button, Box, Typography, Container, CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Cadastro.module.css';

export default function Cadastro() {
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
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
    }
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
    if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    if (nums.length <= 10) return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6, 10)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
  };

  const formatarCEPInput = (value) => {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 5) return nums;
    return `${nums.slice(0, 5)}-${nums.slice(5, 8)}`;
  };

  const handleDataChange = (value) => {
    const hoje = new Date();
    const dataNasc = new Date(value);
    const idade = hoje.getFullYear() - dataNasc.getFullYear();
    
    setDataError({
      futuro: dataNasc > hoje,
      muitoAntiga: idade > 150
    });
  };

  const fetchCEP = async (cep) => {
    if (cep.length !== 8) return;
    
    setLoadingCEP(true);
    setCepError(false);
    
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      
      if (!data.erro) {
        setValue('endereco', data.logradouro || '');
        setValue('bairro', data.bairro || '');
        setValue('cidade', data.localidade || '');
        setValue('uf', data.uf || '');
      } else {
        setCepError(true);
        console.log('CEP não encontrado');
        // Limpar campos de endereço quando o CEP não for encontrado
        setValue('endereco', '');
        setValue('bairro', '');
        setValue('cidade', '');
        setValue('uf', '');
      }
    } catch (error) {
      setCepError(true);
      console.error('Erro ao buscar CEP:', error);
      // Limpar campos de endereço em caso de erro
      setValue('endereco', '');
      setValue('bairro', '');
      setValue('cidade', '');
      setValue('uf', '');
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
    
    setValue('cep', cepFormatado);
    
    if (cepNumeros.length === 8) {
      fetchCEP(cepNumeros);
    }
  };

  const onSubmit = (data) => {
    setMostrarResumo(true);
  };

  const handleBack = () => {
    mostrarResumo ? setMostrarResumo(false) : router.push('/');
  };

  const formatarResumo = (key, value) => {
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

    return valorFormatado;
  };

  return (
    <Container maxWidth="100vw" className={styles.container}>
      <Box className={styles.contentBox}>
        <Typography variant="h3" gutterBottom className={styles.title}>
          Cadastro de Usuário
        </Typography>

        {!mostrarResumo ? (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="nome"
                  control={control}
                  rules={{ required: 'Nome é obrigatório' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Nome Completo"
                      fullWidth
                      required
                      error={!!errors.nome}
                      helperText={errors.nome?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="dataNascimento"
                  control={control}
                  rules={{ 
                    required: 'Data de nascimento é obrigatória',
                    validate: () => !dataError.futuro && !dataError.muitoAntiga
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Data de Nascimento"
                      type="date"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      required
                      error={!!errors.dataNascimento || dataError.futuro || dataError.muitoAntiga}
                      helperText={
                        dataError.futuro 
                          ? <span className={styles.errorText}>Data não pode ser no futuro</span>
                          : dataError.muitoAntiga
                            ? <span className={styles.errorText}>Idade máxima permitida é 150 anos</span>
                            : errors.dataNascimento?.message
                      }
                      inputProps={{
                        max: new Date().toISOString().split('T')[0],
                        min: new Date(new Date().getFullYear() - 150, 0, 1).toISOString().split('T')[0]
                      }}
                      onChange={(e) => {
                        field.onChange(e);
                        handleDataChange(e.target.value);
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="email"
                  control={control}
                  rules={{ 
                    required: 'E-mail é obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'E-mail inválido'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="E-mail"
                      type="email"
                      fullWidth
                      required
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="celular"
                  control={control}
                  rules={{ 
                    required: 'Celular é obrigatório',
                    pattern: {
                      // Aceita (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX
                      value: /^\(\d{2}\) \d{4,5}-\d{4}$/,
                      message: 'Formato inválido (use (XX) XXXX-XXXX ou (XX) 9XXXX-XXXX)'
                    },
                    validate: (value) => {
                      const nums = value.replace(/\D/g, '');
                      // Verifica se tem 10 ou 11 dígitos (com ou sem o 9)
                      return nums.length === 10 || nums.length === 11 || 'Número incompleto';
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Telefone/Celular"
                      fullWidth
                      required
                      error={!!errors.celular}
                      helperText={errors.celular?.message}
                      inputProps={{ maxLength: 15 }}
                      onChange={(e) => {
                        const formattedValue = formatarCelularInput(e.target.value);
                        field.onChange(formattedValue);
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12}>
                <Box className={styles.cepContainer}>
                  <Controller
                    name="cep"
                    control={control}
                    rules={{ 
                      required: 'CEP é obrigatório',
                      minLength: {
                        value: 9,
                        message: 'CEP incompleto'
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="CEP"
                        fullWidth
                        required
                        error={!!errors.cep || cepError}
                        helperText={
                          loadingCEP 
                            ? 'Buscando endereço...' 
                            : errors.cep?.message || 
                              (cepError ? <span className={styles.errorText}>Não foi possível encontrar o CEP informado</span> : '')
                        }
                        InputProps={{
                          endAdornment: loadingCEP ? <CircularProgress size={20} /> : null
                        }}
                        sx={{ flex: 1 }}
                        inputProps={{ maxLength: 9 }}
                        onChange={(e) => {
                          field.onChange(e);
                          handleCEPChange(e);
                        }}
                      />
                    )}
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
                <Controller
                  name="endereco"
                  control={control}
                  rules={{ required: 'Endereço é obrigatório' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Endereço"
                      fullWidth
                      required
                      error={!!errors.endereco}
                      helperText={errors.endereco?.message}
                      InputProps={{
                        readOnly: true,
                        sx: { pointerEvents: 'none' }
                      }}
                      className={styles.readOnlyInput}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <Controller
                  name="numero"
                  control={control}
                  rules={{ 
                    required: 'Número é obrigatório',
                    pattern: {
                      value: /^[0-9]+$/,
                      message: 'Apenas números são permitidos'
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Número"
                      fullWidth
                      required
                      error={!!errors.numero}
                      helperText={errors.numero?.message}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*'
                      }}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Controller
                  name="bairro"
                  control={control}
                  rules={{ required: 'Bairro é obrigatório' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Bairro"
                      fullWidth
                      required
                      error={!!errors.bairro}
                      helperText={errors.bairro?.message}
                      InputProps={{
                        readOnly: true,
                        sx: { pointerEvents: 'none' }
                      }}
                      className={styles.readOnlyInput}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={8}>
                <Controller
                  name="cidade"
                  control={control}
                  rules={{ required: 'Cidade é obrigatória' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Cidade"
                      fullWidth
                      required
                      error={!!errors.cidade}
                      helperText={errors.cidade?.message}
                      InputProps={{
                        readOnly: true,
                        sx: { pointerEvents: 'none' }
                      }}
                      className={styles.readOnlyInput}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="uf"
                  control={control}
                  rules={{ required: 'UF é obrigatória' }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="UF"
                      fullWidth
                      required
                      error={!!errors.uf}
                      helperText={errors.uf?.message}
                      InputProps={{
                        readOnly: true,
                        sx: { pointerEvents: 'none' }
                      }}
                      className={styles.readOnlyInput}
                    />
                  )}
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
              {Object.entries(watch()).map(([key, value]) => {
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
                  <Typography key={key} className={styles.resumeItem}>
                    <Box component="span" className={styles.resumeLabel}>
                      {labels[key] || key}:
                    </Box> <Box component="span" className={styles.resumeValue}>{formatarResumo(key, value)}</Box>
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