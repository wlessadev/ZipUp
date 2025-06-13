import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/Cadastro.module.css';

import GradientBackground from '../components/GradientBackground';
import ResumeDisplay from '../components/form/ResumeDisplay';
import { validateData } from '../utils/validations';
import { 
  NomeField, 
  EmailField, 
  DataNascimentoField 
} from '../components/form/PersonalInfoFields';
import { 
  CelularField, 
  CEPField 
} from '../components/form/MaskedInputFields';
import { 
  EnderecoField, 
  BairroField, 
  CidadeField, 
  UfField 
} from '../components/form/CEPAddressFields';
import { 
  NumeroField, 
  ComplementoField 
} from '../components/form/UserAddressFields';

export default function Cadastro() {
  // Configuração do react-hook-form com valores iniciais
  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      nome: '',
      email: '',
      dataNascimento: '',
      celular: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
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

  /**
   * Validação customizada de data de nascimento
   * @param {string} value - Data no formato string
   */
  const handleDataChange = (value) => {
    setDataError(validateData(value));
  };

  /**
   * Busca automática de endereço via API dos Correios
   * @param {string} cep - CEP a ser consultado (apenas dígitos)
   */
  const fetchCEP = async (cep) => {
    if (cep.length !== 8) return;
    
    setLoadingCEP(true);
    setCepError(false);
    
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      
      if (!data.erro) {
        // Preenche automaticamente os campos de endereço
        setValue('endereco', data.logradouro || '');
        setValue('bairro', data.bairro || '');
        setValue('cidade', data.localidade || '');
        setValue('uf', data.uf || '');
      } else {
        setCepError(true);
        clearAddressFields();
      }
    } catch (error) {
      setCepError(true);
      clearAddressFields();
    } finally {
      setLoadingCEP(false);
    }
  };

  const clearAddressFields = () => {
    setValue('endereco', '');
    setValue('bairro', '');
    setValue('cidade', '');
    setValue('uf', '');
  };

  const onSubmit = (data) => {
    setMostrarResumo(true);
  };

  const handleBack = () => {
    mostrarResumo ? setMostrarResumo(false) : router.push('/');
  };

  return (
    <Container maxWidth="100vw" className={styles.container}>
      <GradientBackground />

      <Box className={styles.contentBox}>
        <div className={styles.title}>
          Cadastro de Usuário
        </div>

        {!mostrarResumo ? (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.registerForm}>
            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={8}>
                <NomeField control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <DataNascimentoField 
                  control={control} 
                  errors={errors} 
                  dataError={dataError} 
                  handleDataChange={handleDataChange} 
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={6}>
                <EmailField control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CelularField control={control} errors={errors} />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12}>
                <Box className={styles.cepContainer}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={6}>
                      <CEPField 
                        control={control} 
                        errors={errors} 
                        loadingCEP={loadingCEP} 
                        cepError={cepError} 
                        fetchCEP={(cep) => fetchCEP(cep)} 
                      />
                    </Grid>
                    <Grid item xs={12} sm={4} md={6}>
                      <Button 
                        variant="text" 
                        color="primary"
                        size="small"
                        onClick={() => window.open('https://buscacepinter.correios.com.br/app/endereco/index.php', '_blank')}
                        className={styles.cepButton}
                      >
                        Não sabe seu CEP? Clique aqui!
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={8} md={6} lg={5}>
                <EnderecoField control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <NumeroField control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} sm={3} md={4}>
                <ComplementoField control={control} errors={errors} />
              </Grid>
            </Grid>

            <Grid container spacing={2} className={styles.formGrid}>
              <Grid item xs={12} sm={12} md={4}>
                <BairroField control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <CidadeField control={control} errors={errors} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <UfField control={control} errors={errors} />
              </Grid>
            </Grid>

            <Box className={styles.buttonGroup}>
              <div
                variant="outlined" 
                color="secondary" 
                onClick={handleBack}
                className={styles.backButton}
              >
                Voltar
              </div>
              <div 
                type="submit" 
                variant="contained" 
                color="primary"
                className={styles.continueButton}
                onClick={handleSubmit(onSubmit)}
              >
                Continuar
              </div>
            </Box>
          </form>
        ) : (
          <ResumeDisplay 
            data={watch()} 
            handleBack={handleBack} 
          />
        )}
      </Box>
    </Container>
  );
}