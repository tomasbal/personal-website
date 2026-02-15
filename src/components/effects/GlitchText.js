import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const glitchAnim1 = keyframes`
  0% { clip-path: inset(40% 0 61% 0); transform: translate(-2px, 2px); }
  20% { clip-path: inset(92% 0 1% 0); transform: translate(1px, -1px); }
  40% { clip-path: inset(43% 0 1% 0); transform: translate(-1px, 2px); }
  60% { clip-path: inset(25% 0 58% 0); transform: translate(2px, 1px); }
  80% { clip-path: inset(54% 0 7% 0); transform: translate(-2px, -1px); }
  100% { clip-path: inset(58% 0 43% 0); transform: translate(0); }
`;

const glitchAnim2 = keyframes`
  0% { clip-path: inset(65% 0 13% 0); transform: translate(2px, -1px); }
  20% { clip-path: inset(79% 0 14% 0); transform: translate(-2px, 2px); }
  40% { clip-path: inset(48% 0 23% 0); transform: translate(1px, -2px); }
  60% { clip-path: inset(70% 0 9% 0); transform: translate(-1px, 1px); }
  80% { clip-path: inset(15% 0 62% 0); transform: translate(2px, 2px); }
  100% { clip-path: inset(51% 0 30% 0); transform: translate(0); }
`;

const StyledGlitch = styled.span`
  position: relative;
  display: inline-block;

  &:hover {
    &::before,
    &::after {
      content: attr(data-text);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &::before {
      color: #ff2d6b;
      animation: ${glitchAnim1} 0.3s infinite linear alternate-reverse;
      z-index: -1;
    }

    &::after {
      color: #00ffc8;
      animation: ${glitchAnim2} 0.3s infinite linear alternate-reverse;
      z-index: -2;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover::before,
    &:hover::after {
      animation: none;
      display: none;
    }
  }
`;

const GlitchText = ({ children, ...props }) => (
  <StyledGlitch data-text={children} {...props}>
    {children}
  </StyledGlitch>
);

GlitchText.propTypes = {
  children: PropTypes.string.isRequired,
};

export default GlitchText;
