import { Box, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ textAlign: 'center', padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Bem-vindo ao ZipUp!
      </Typography>
      <Typography variant="body1">
        Aproveite o seu dia e não deixe de se cadastrar para começar a usar o ZipUp!
      </Typography>
    </Box>
  );
}