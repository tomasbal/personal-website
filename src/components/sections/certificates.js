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
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  position: relative;
  margin-top: 30px;
`;

const StyledCertLink = styled.a`
  text-decoration: none;
  &:hover,
  &:focus {
    outline: 0;
  }
`;

const StyledCertCard = styled.div`
  ${mixins.boxShadow};
  position: relative;
  padding: 20px 15px;
  border-radius: ${theme.borderRadius};
  background-color: ${colors.lightNavy};
  transition: ${theme.transition};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    background-color: ${colors.lightestNavy};
  }
`;

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const StyledIcon = styled.div`
  width: 85px;
  height: 85px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    transition: ${theme.transition};
    border-radius: 8px;

    ${StyledCertCard}:hover & {
      transform: scale(1.05);
    }
  }
`;

const StyledCertName = styled.h5`
  margin: 0 0 8px;
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.md};
  text-align: center;
  line-height: 1.4;
`;

const StyledCertIssuer = styled.p`
  margin: 0;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.green};
  text-align: center;
`;

const StyledCertDate = styled.p`
  margin: 10px 0 0;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  color: ${colors.slate};
  text-align: center;
  margin-top: auto;
`;

const StyledViewDetails = styled.div`
  color: ${colors.lightSlate};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  text-align: center;
  margin-top: 15px;
  visibility: hidden;
  opacity: 0;
  transition: ${theme.transition};

  ${StyledCertCard}:hover & {
    visibility: visible;
    opacity: 1;
  }
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
          certificates.map(({ name, issuer, date, icon, url }, i) => (
            <StyledCertLink key={i} href={url} target="_blank" rel="noopener noreferrer">
              <StyledCertCard>
                <StyledIconContainer>
                  <StyledIcon>{icon && <img src={icon} alt={`${name} Icon`} />}</StyledIcon>
                </StyledIconContainer>
                <StyledCertName>{name}</StyledCertName>
                <StyledCertIssuer>{issuer}</StyledCertIssuer>
                <StyledCertDate>{date}</StyledCertDate>
                <StyledViewDetails>View Details ↗</StyledViewDetails>
              </StyledCertCard>
            </StyledCertLink>
          ))}
      </StyledCertGrid>
    </StyledContainer>
  );
};

Certificates.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Certificates;
