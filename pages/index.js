import { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Home.module.css'; 

// Importações dos componentes
import GradientBackground from '../components/GradientBackground';
import LogoWithTitle from '../components/LogoWithTitle';
import DateTimeDisplay from '../components/DateTimeDisplay';
import RegisterButton from '../components/RegisterButton';
import FooterLogo from '../components/FooterLogo';
import CartoonPresenter from '../components/CartoonPresenter';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [isClient, setIsClient] = useState(false); // Para SSR (Server-Side Rendering)
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

  /**
   * Handler para navegação programática
   * Encaminha o usuário para a página de cadastro
   */
  const handleRegisterClick = () => {
    router.push('/cadastro');
  };

  return (
    <Container maxWidth="100vw" className={styles.container}>
      <GradientBackground />

      <Box className={styles.contentBox}>
        <Box className={styles.headerBox}>
          <LogoWithTitle />
          <Typography variant="h5" className={styles.description}>
            Que bom te ver por aqui!
          </Typography>
        </Box>

        <Box className={styles.dateBox}>
          <DateTimeDisplay 
            isClient={isClient} 
            currentDate={currentDate} 
            currentTime={currentTime} 
          />

          <Typography variant="body" className={styles.description}>
            Cadastre-se agora mesmo e <br/> comece a usar o ZipUp!
          </Typography>
        </Box>

        <Box className={styles.actionBox}>
          <RegisterButton onClick={handleRegisterClick} />
          <FooterLogo />
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
