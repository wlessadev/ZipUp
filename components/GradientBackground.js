import { Box } from '@mui/material';
import styles from '../styles/Home.module.css';

const GradientBackground = () => (
  <>
    <Box className={styles.gradientLayerOne} />
    <Box className={styles.gradientLayerTwo} />
    <Box className={styles.gradientLayerThree} />
    <Box className={styles.gradientLayerFour} />
  </>
);

export default GradientBackground;