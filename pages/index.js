import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const [currentTime, setCurrentTime] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [isClient, setIsClient] = useState(false); // Verifica se está no lado do cliente

  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Marca o início do lado do cliente

    // Atualiza a hora e a data a cada segundo
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
      setCurrentDate(new Date().toLocaleDateString());
    }, 1000);

    // Limpa o intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);

  // Função para navegar para a página de cadastro
  const handleRegisterClick = () => {
    router.push('/cadastro');
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao ZipUp!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Que bom te ver por aqui! Agora são{' '}
        {isClient && currentTime ? currentTime : '--:--:--'} e a data de hoje é{' '}
        {isClient && currentDate ? currentDate : '--/--/----'}.
      </Typography>
      <Typography variant="body1">
        Aproveite o seu dia e não deixe de se cadastrar para começar a usar o ZipUp!
      </Typography>

      {/* Botão de Cadastro */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={handleRegisterClick}
      >
        Cadastre-se agora
      </Button>
    </Box>
  );
}