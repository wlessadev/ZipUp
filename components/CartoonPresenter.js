import { useState, useEffect } from 'react';
import styles from '../styles/CartoonPresenter.module.css';

/**
 * Componente que exibe um personagem cartoon animado (acenando)
 * com responsividade para diferentes tamanhos de tela.
 * 
 * Características principais:
 * - Animação suave usando sprites
 * - Cálculo responsivo de tamanho e posição
 * - Otimizado para performance com useEffect limpos
 */
export default function CartoonPresenter() {
  const [waveFrameIndex, setWaveFrameIndex] = useState(0);
  const [imageSize, setImageSize] = useState(300); // tamanho padrão inicial

  const waveFrames = [
    '/images/cartoon-presenter/WagnerFrames1.png',
    '/images/cartoon-presenter/WagnerFrames2.png',
    '/images/cartoon-presenter/WagnerFrames4.png',
    '/images/cartoon-presenter/WagnerFrames5.png',
    '/images/cartoon-presenter/WagnerFrames6.png',
    '/images/cartoon-presenter/WagnerFrames7.png'
  ];

  const animationIndices = [0, 1, 2, 3, 4, 5, 4, 3, 2, 1];

  /**
   * Calcula a transformação necessária para o personagem
   * com base na largura desejada, mantendo proporções corretas
   * 
   * @param {number} targetWidth - Largura desejada para a área visível
   * @returns {Object} Contendo imageSize e translateX calculados
   */
  const calculatePresenterTransform = (targetWidth = 610) => {
    const originalImageWidth = 1000;
    const visibleCharacterWidth = 712;
    const hiddenLeft = 288;

    const scaleFactor = targetWidth / visibleCharacterWidth;
    const scaledImageSize = originalImageWidth * scaleFactor;
    const offsetX = hiddenLeft * scaleFactor;

    return {
      imageSize: scaledImageSize,
      translateX: -offsetX,
    };
  };

  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const targetWidth = Math.max(610, Math.min(712, screenWidth)); // limitar visual

      const { imageSize, translateX } = calculatePresenterTransform(targetWidth);

      setImageSize(imageSize);
      setTranslateX(translateX);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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
        style={{ 
          width: `${imageSize}px`, 
          height: `${imageSize}px`,
          transform: `translateX(${translateX}px)`
        }}
      />
    </div>
  );
}
