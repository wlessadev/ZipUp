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
  const [windowWidth, setWindowWidth] = useState(0);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleRegisterClick = () => {
    router.push('/cadastro');
  };

  return (
    <Container maxWidth="100vw" className={styles.container}>
      <Box className={styles.gradientLayerOne} />
      <Box className={styles.gradientLayerTwo} />
      <Box className={styles.gradientLayerThree} />
      <Box className={styles.gradientLayerFour} />

      <Box className={styles.contentBox}>
        <Box className={styles.headerBox}>
          <Box className={styles.titleGroup}>
            <div className={styles.titleText}>
              Bem-vindo(a) ao
            </div>
            <div className={styles.logoAndExclamation}>
              <Image 
                src="/images/Logo_ZipUp.png"
                alt="Logo do ZipUp"
                width={120}
                height={120}
                style={{ objectFit: 'contain' }}
              />
              <span className={styles.exclamation}>!</span>
            </div>
          </Box>

          <Typography variant="h5" className={styles.description}>
            Que bom te ver por aqui!
          </Typography>
        </Box>

        <Box className={styles.dateBox}>
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

          <Typography variant="body" className={styles.description}>
            Cadastre-se agora mesmo e <br/> comece a usar o ZipUp!
          </Typography>
        </Box>

        <Box className={styles.actionBox}>
          <div
            variant="contained"
            color="primary"
            size="large"
            className={styles.registerButton}
            onClick={handleRegisterClick}
          >
            Cadastrar
          </div>

          <Box className={styles.logoContainer}>
            <Typography variant="h6" className={styles.footerText}>
              Um teste
            </Typography>
            <Image 
              src="/images/logo-hbi-light-contrast.png"
              alt="Logo da HBI"
              width={60}
              height={60}
              style={{ objectFit: 'contain', marginLeft: '8px' }}
            />
          </Box>
        </Box>
      </Box>

      {windowWidth >= 610 && (
        <Box className={styles.characterBox}>
          <CartoonPresenter />
        </Box>
      )}
    </Container>

  );
}
