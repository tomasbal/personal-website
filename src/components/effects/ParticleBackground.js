import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const ParticleBackground = () => {
  const [Particles, setParticles] = useState(null);
  const [initFn, setInitFn] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadParticles = async () => {
      try {
        const { default: ParticlesComponent } = await import('@tsparticles/react');
        const { loadSlim } = await import('@tsparticles/slim');
        setParticles(() => ParticlesComponent);
        setInitFn(() => async engine => {
          await loadSlim(engine);
        });
      } catch (e) {
        // Silently fail if particles can't load
      }
    };

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      loadParticles();
    }
  }, []);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const options = {
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: {
        value: isMobile ? 25 : 50,
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: '#00ffc8',
      },
      links: {
        color: '#00ffc8',
        distance: 150,
        enable: true,
        opacity: 0.08,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        outModes: {
          default: 'out',
        },
      },
      opacity: {
        value: 0.15,
      },
      size: {
        value: { min: 1, max: 2 },
      },
    },
    detectRetina: true,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
  };

  if (!Particles || !initFn) return null;

  return (
    <StyledContainer>
      <Particles id="tsparticles" init={initFn} options={options} />
    </StyledContainer>
  );
};

export default ParticleBackground;
