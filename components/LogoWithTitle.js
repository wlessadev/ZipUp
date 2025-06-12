import { Box } from '@mui/material';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const LogoWithTitle = () => (
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
);

export default LogoWithTitle;