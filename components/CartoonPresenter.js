// components/CartoonPresenter.js
import { useState, useEffect } from 'react';
import styles from '../styles/CartoonPresenter.module.css';

export default function CartoonPresenter() {
  const [waveFrameIndex, setWaveFrameIndex] = useState(0);
  
  // Frames da animação (removidos os frames 8, 9 e 10)
  const waveFrames = [
    '/images/cartoon-presenter/WagnerFrames1.png',
    '/images/cartoon-presenter/WagnerFrames2.png',
    '/images/cartoon-presenter/WagnerFrames4.png',
    '/images/cartoon-presenter/WagnerFrames5.png',
    '/images/cartoon-presenter/WagnerFrames6.png',
    '/images/cartoon-presenter/WagnerFrames7.png'
  ];

  // Índices da animação ajustados para os frames disponíveis (0-5)
  const animationIndices = [
    0, 1, 2, 3, 4, 5, 4, 3, 2, 1
  ];

  // Animação de acenar
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveFrameIndex((prev) => (prev + 1) % animationIndices.length);
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.characterContainer}>
      <img 
        src={waveFrames[animationIndices[waveFrameIndex]]} 
        alt="Apresentador Cartoon acenando" 
        className={styles.character}
      />
    </div>
  );
}