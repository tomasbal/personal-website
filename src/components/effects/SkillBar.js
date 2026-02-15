import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '@styles';

const StyledBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: ${theme.fonts.SFMono};
  font-size: ${theme.fontSizes.smish};
  margin-bottom: 8px;
`;

const StyledLabel = styled.span`
  color: ${theme.colors.lightestSlate};
  min-width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledProgress = styled.span`
  color: ${theme.colors.green};
  white-space: nowrap;
`;

const StyledPercent = styled.span`
  color: ${theme.colors.slate};
  min-width: 35px;
  text-align: right;
`;

const SkillBar = ({ name, level }) => {
  const filled = Math.round(level / 10);
  const empty = 10 - filled;
  const bar = '='.repeat(filled) + ' '.repeat(empty);

  return (
    <StyledBar>
      <StyledLabel>{name}</StyledLabel>
      <StyledProgress>[{bar}]</StyledProgress>
      <StyledPercent>{level}%</StyledPercent>
    </StyledBar>
  );
};

SkillBar.propTypes = {
  name: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
};

export default SkillBar;
