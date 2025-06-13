import { Typography, Box } from '@mui/material';
import styles from '../../styles/Cadastro.module.css';
import { formatarResumo } from '../../utils/formatters';

/**
 * Componente para exibição do resumo dos dados do formulário, facilitando caso seja necessário adicionar mais campos no futuro.
 * - Exibe todos os campos preenchidos em formato legível
 * - Aplica formatação específica para cada tipo de dado
 * - Oferece opção de voltar para edição
 * 
 * @param {Object} data - Dados do formulário a serem exibidos
 * @param {Function} handleBack - Função para retornar à etapa anterior
 */

export default function ResumeDisplay({ data, handleBack }) {
  const labels = {
    nome: 'Nome',
    email: 'E-mail',
    dataNascimento: 'Data de Nascimento',
    celular: 'Celular',
    cep: 'CEP',
    endereco: 'Endereço',
    numero: 'Número',
    complemento: 'Complemento',
    bairro: 'Bairro',
    cidade: 'Cidade',
    uf: 'UF'
  };

  return (
    <Box sx={{ textAlign: 'left' }}>
      <Typography variant="h5" className={styles.resumeTitle}>
        Resumo dos dados:
      </Typography>
      
      <Box className={styles.resumeBox}>
        {Object.entries(data).map(([key, value]) => (
          <Typography key={key} className={styles.resumeItem}>
            <Box component="span" className={styles.resumeLabel}>
              {labels[key] || key}:
            </Box> <Box component="span" className={styles.resumeValue}>
              {formatarResumo(key, value)}
            </Box>
          </Typography>
        ))}
      </Box>
      
      <div 
        className={styles.backButton}
        onClick={handleBack}
      >
        Voltar
      </div>
    </Box>
  );
}