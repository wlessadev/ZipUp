import { Box, Typography } from '@mui/material';
import styles from '../styles/Home.module.css';

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