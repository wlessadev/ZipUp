import { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import CartoonPresenter from '../components/CartoonPresenter';
import Image from 'next/image';
import styles from '../styles/Home.module.css'; 

export default function Home() {
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRegisterClick = () => {
    router.push('/cadastro');
  };

  return (
    <Container maxWidth="100vw" className={styles.container}>
      <Box className={styles.contentBox}>
        <Box className={styles.logoContainer}>
          <Typography variant="h3" className={styles.title}>
            Bem-vindo ao
          </Typography>
          <Image 
            src="/images/Logo_ZipUp.png"
            alt="ZipUp Logo"
            width={120}
            height={120}
            style={{
              objectFit: 'contain',
              marginLeft: '8px'
            }}
          />
          <Typography variant="h3" className={styles.title}>!</Typography>
        </Box>
        
        <Typography variant="h5" gutterBottom className={styles.subtitle}>
          Que bom te ver por aqui! Agora são{' '}
          <Box component="span" className={styles.timeText}>
            {isClient && currentTime ? currentTime : '--:--:--'}
          </Box>{' '}
          do dia{' '}
          <Box component="span" className={styles.timeText}>
            {isClient && currentDate ? currentDate : '--/--/----'}
          </Box>.
        </Typography>
        
        <Typography variant="body1" className={styles.description}>
          Não deixe de se cadastrar para começar a usar o ZipUp!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          className={styles.registerButton}
          onClick={handleRegisterClick}
        >
          Cadastre-se agora
        </Button>
      </Box>
      <CartoonPresenter/>
    </Container>
  );
}