import React from 'react';
import styled from 'styled-components';

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.03) 0px,
    rgba(0, 0, 0, 0.03) 1px,
    transparent 1px,
    transparent 3px
  );
  opacity: 0.4;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const ScanlineOverlay = () => <StyledOverlay aria-hidden="true" />;

export default ScanlineOverlay;
