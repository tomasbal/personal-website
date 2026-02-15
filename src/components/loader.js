import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins } from '@styles';
const { colors, fonts } = theme;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  background-color: ${colors.darkNavy};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  padding: 0 20%;
`;

const StyledLine = styled.div`
  font-family: ${fonts.SFMono};
  font-size: 14px;
  color: ${colors.green};
  margin-bottom: 8px;
  opacity: ${props => (props.visible ? 1 : 0)};
  transition: opacity 0.15s ease;

  .ok {
    color: ${colors.green};
  }
  .label {
    color: ${colors.slate};
  }
`;

const Loader = ({ finishLoading }) => {
  const [lines, setLines] = useState([]);

  const bootSequence = [
    { text: '> INITIALIZING SYSTEM...', delay: 200 },
    { text: '> LOADING MODULES............ ', suffix: '[OK]', delay: 600 },
    { text: '> ESTABLISHING CONNECTION.... ', suffix: '[OK]', delay: 400 },
    { text: '> WELCOME, VISITOR.', delay: 300 },
  ];

  useEffect(() => {
    // Check for reduced motion preference
    if (typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        finishLoading();
        return;
      }
    }

    let totalDelay = 100;
    const timeouts = [];

    bootSequence.forEach((line, i) => {
      totalDelay += line.delay;
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, i]);
      }, totalDelay);
      timeouts.push(timeout);
    });

    const finishTimeout = setTimeout(() => {
      finishLoading();
    }, totalDelay + 500);
    timeouts.push(finishTimeout);

    return () => timeouts.forEach(t => clearTimeout(t));
  }, []);

  return (
    <StyledContainer className="loader">
      <Helmet bodyAttributes={{ class: `hidden` }} />
      {bootSequence.map((line, i) => (
        <StyledLine key={i} visible={lines.includes(i)}>
          <span className="label">{line.text}</span>
          {line.suffix && lines.includes(i) && <span className="ok">{line.suffix}</span>}
        </StyledLine>
      ))}
    </StyledContainer>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
