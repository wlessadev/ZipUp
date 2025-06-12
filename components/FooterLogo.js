import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const FooterLogo = () => (
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
);

export default FooterLogo;