import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, media } from '@styles';

const StyledTerminal = styled.div`
  background: rgba(10, 10, 15, 0.9);
  border: 1px solid rgba(0, 255, 200, 0.15);
  border-radius: 6px;
  overflow: hidden;
  width: 100%;
`;

const StyledTitleBar = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(22, 27, 34, 0.8);
  border-bottom: 1px solid rgba(0, 255, 200, 0.08);
  gap: 8px;
`;

const StyledDot = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.color};
  ${media.phone`
    width: 10px;
    height: 10px;
  `};
`;

const StyledTitle = styled.span`
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.xs};
  color: ${theme.colors.slate};
  margin-left: 8px;
`;

const StyledContent = styled.div`
  padding: 24px;
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.sm};
  ${media.phone`padding: 16px;`};
`;

const TerminalWindow = ({ title = 'terminal', children }) => (
  <StyledTerminal>
    <StyledTitleBar>
      <StyledDot color="#ff5f57" />
      <StyledDot color="#ffbd2e" />
      <StyledDot color="#28c840" />
      <StyledTitle>{title}</StyledTitle>
    </StyledTitleBar>
    <StyledContent>{children}</StyledContent>
  </StyledTerminal>
);

TerminalWindow.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default TerminalWindow;
