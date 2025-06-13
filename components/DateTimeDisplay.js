import { Box, Typography } from '@mui/material';
import styles from '../styles/Home.module.css';

/**
 * Componente para exibição da data e hora atuais
 * 
 * @param {boolean} isClient - Indica se está sendo renderizado no lado do cliente
 * @param {string} currentDate - Data formatada para exibição
 * @param {string} currentTime - Hora formatada para exibição
 * 
 * Exibe a data e hora atuais quando disponíveis, ou placeholders enquanto carrega
 */
const DateTimeDisplay = ({ isClient, currentDate, currentTime }) => (
  <Typography variant="h5" gutterBottom className={styles.subtitle}>
    {isClient && currentDate && currentTime ? (
      <>
        Hoje é{' '}
        <Box component="span" className={styles.timeText}>
          {currentDate}
        </Box>
        ,{' '}
        <Box component="span" className={styles.timeText}>
          {currentTime}
        </Box>
        .
      </>
    ) : (
      <>
        Hoje é{' '}
        <Box component="span" className={styles.timeText}>
          --/--/----
        </Box>
        ,{' '}
        <Box component="span" className={styles.timeText}>
          --:--:--
        </Box>
        . Vamos começar?
      </>
    )}
  </Typography>
);

export default DateTimeDisplay;