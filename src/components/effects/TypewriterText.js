import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '@styles';

const StyledWrapper = styled.span`
  font-family: ${theme.fonts.SFMono};

  .cursor {
    display: inline-block;
    width: 8px;
    height: 1em;
    background-color: ${theme.colors.green};
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: blink 1s step-end infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .cursor {
      animation: none;
    }
  }
`;

const TypewriterText = ({ text, speed = 30, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [started, setStarted] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setDisplayText(text);
        return;
      }
    }

    const startTimeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimeout);
  }, [delay, text]);

  useEffect(() => {
    if (!started) return;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayText(text.substring(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <StyledWrapper>
      {displayText}
      <span className="cursor" aria-hidden="true" />
    </StyledWrapper>
  );
};

TypewriterText.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  delay: PropTypes.number,
};

export default TypewriterText;
