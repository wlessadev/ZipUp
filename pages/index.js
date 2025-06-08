import { useState, useEffect } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/router';
import CartoonPresenter from '../components/CartoonPresenter'; // Importando o componente CartoonPresenter
import Image from 'next/image'; // Importe o componente Image do Next


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
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          marginBottom: 4
        }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
            }}
          >
            Bem-vindo ao
          </Typography>
          {/* Substitua pelo caminho correto da sua logo */}
          <Image 
            src="/images/Logo_ZipUp.png" // caminho para sua imagem
            alt="ZipUp Logo"
            width={120} // ajuste conforme necessário
            height={120} // ajuste conforme necessário
            style={{
              objectFit: 'contain',
              marginLeft: '8px' // ajuste o espaçamento
            }}
          />
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
            }}
          >!
          </Typography>
        </Box>
        
        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            color: 'black',
            marginBottom: 3
          }}
        >
          Que bom te ver por aqui! Agora são{' '}
          <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {isClient && currentTime ? currentTime : '--:--:--'}
          </Box>{' '}
          do dia{' '}
          <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            {isClient && currentDate ? currentDate : '--/--/----'}
          </Box>.
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            marginBottom: 4,
            fontSize: '1.1rem'
          }}
        >
          Não deixe de se cadastrar para começar a usar o ZipUp!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ 
            marginTop: 2,
            padding: '12px 32px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            borderRadius: 1
          }}
          onClick={handleRegisterClick}
        >
          Cadastre-se agora
        </Button>
      </Box>
          <CartoonPresenter/>
    </Container>
  );
}