import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { mixins, media, Section, Heading } from '@styles';

const StyledContainer = styled(Section)`
  position: relative;
`;
const StyledContent = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-bottom: 40px;
  ${media.tablet`margin-bottom: 70px;`};
  a {
    ${mixins.inlineLink};
  }
`;

const Competence = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title } = frontmatter;
  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContainer id="competence" ref={revealContainer}>
      <Heading>{title}</Heading>
      <StyledContent dangerouslySetInnerHTML={{ __html: html }} />
    </StyledContainer>
  );
};

Competence.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Competence;
