import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '@styles';

const StyledIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.green};
  letter-spacing: 0.05em;
`;

const StyledDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${theme.colors.green};
  box-shadow: 0 0 6px rgba(0, 255, 200, 0.4);
  animation: pulse-glow 2s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const StatusIndicator = ({ label = 'AVAILABLE FOR PROJECTS' }) => (
  <StyledIndicator>
    <StyledDot aria-hidden="true" />
    <span>{label}</span>
  </StyledIndicator>
);

StatusIndicator.propTypes = {
  label: PropTypes.string,
};

export default StatusIndicator;
