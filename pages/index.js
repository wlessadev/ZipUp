import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Atualiza a data quando o componente monta
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  const handleRegisterClick = () => {
    //router.push('/cadastro');
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao ZipUp!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Hoje é {currentDate || '--/--/----'}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Aproveite o seu dia e não deixe de se cadastrar para começar a usar o ZipUp!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleRegisterClick}
      >
        Cadastre-se agora
      </Button>
    </Box>
  );
}