import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

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

const StyledCertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  position: relative;
  margin-top: 30px;
`;

const StyledCertCard = styled.div`
  ${mixins.boxShadow};
  position: relative;
  padding: 25px;
  border-radius: ${theme.borderRadius};
  background-color: ${colors.lightNavy};
  transition: ${theme.transition};

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledCertName = styled.h5`
  margin: 0 0 8px;
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.lg};
`;

const StyledCertIssuer = styled.p`
  margin: 0;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.green};
`;

const StyledCertDate = styled.p`
  margin: 10px 0 0;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  color: ${colors.slate};
`;

const Certificates = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title, certificates } = frontmatter;
  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContainer id="certificates" ref={revealContainer}>
      <Heading>{title}</Heading>
      <StyledContent dangerouslySetInnerHTML={{ __html: html }} />
      <StyledCertGrid>
        {certificates &&
          certificates.map(({ name, issuer, date }, i) => (
            <StyledCertCard key={i}>
              <StyledCertName>{name}</StyledCertName>
              <StyledCertIssuer>{issuer}</StyledCertIssuer>
              <StyledCertDate>{date}</StyledCertDate>
            </StyledCertCard>
          ))}
      </StyledCertGrid>
    </StyledContainer>
  );
};

Certificates.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Certificates;
