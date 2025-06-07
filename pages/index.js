import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  // Função para navegar para a página de cadastro
  const handleRegisterClick = () => {
    //router.push('/cadastro');
  };

  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao ZipUp!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
        Aproveite o seu dia e não deixe de se cadastrar para começar a usar o ZipUp!
      </Typography>

      {/* Botão de Cadastro */}
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