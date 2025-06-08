// components/CartoonPresenter.js
import { useState, useEffect } from 'react';
import styles from '../styles/CartoonPresenter.module.css';

export default function CartoonPresenter() {
  const [waveFrameIndex, setWaveFrameIndex] = useState(0);
  
  // Frames da animação
  const waveFrames = [
    '/images/cartoon-presenter/WagnerFrames1.png',
    '/images/cartoon-presenter/WagnerFrames2.png',
    '/images/cartoon-presenter/WagnerFrames3.png',
    '/images/cartoon-presenter/WagnerFrames4.png',
    '/images/cartoon-presenter/WagnerFrames5.png',
    '/images/cartoon-presenter/WagnerFrames6.png',
    '/images/cartoon-presenter/WagnerFrames7.png',
    '/images/cartoon-presenter/WagnerFrames8.png',
    '/images/cartoon-presenter/WagnerFrames9.png',
    '/images/cartoon-presenter/WagnerFrames10.png',
  ];

  // Índices da animação
  const animationIndices = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 8, 7, 6, 5, 4, 3, 2, 1
  ];

  // Animação de acenar
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveFrameIndex((prev) => (prev + 1) % animationIndices.length);
    }, 100);
    
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