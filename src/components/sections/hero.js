import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { email } from '@config';
import { GlitchText, TypewriterText, StatusIndicator } from '@components/effects';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
const { colors, fontSizes, fonts, navDelay, loaderDelay } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  ${media.tablet`padding-top: 150px;`};
  div {
    width: 100%;
  }
`;
const StyledOverline = styled.h1`
  color: ${colors.green};
  margin: 0 0 20px 3px;
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  ${media.tablet`font-size: ${fontSizes.smish};`};
`;
const StyledTitle = styled.h2`
  font-size: 80px;
  line-height: 1.1;
  margin: 0;
  font-family: ${fonts.Calibre};
  text-shadow: 0 0 20px rgba(0, 255, 200, 0.15);
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledSubtitle = styled.h3`
  font-size: 50px;
  line-height: 1.1;
  color: ${colors.slate};
  font-family: ${fonts.SFMono};
  font-weight: 400;
  ${media.desktop`font-size: 40px;`};
  ${media.tablet`font-size: 30px;`};
  ${media.phablet`font-size: 24px;`};
  ${media.phone`font-size: 20px;`};

  span.separator {
    color: ${colors.green};
    margin: 0 12px;
  }
`;
const StyledDescription = styled.div`
  margin-top: 25px;
  width: 50%;
  max-width: 500px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.md};
  color: ${colors.slate};
  line-height: 1.6;
  a {
    ${mixins.inlineLink};
  }
`;
const StyledButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 50px;
  ${media.phablet`flex-direction: column;`};
`;
const StyledEmailLink = styled.a`
  ${mixins.bigButton};
`;
const StyledDossierLink = styled.a`
  ${mixins.bigButton};
  color: ${colors.slate};
  border-color: ${colors.lightestNavy};
  &:hover,
  &:focus,
  &:active {
    color: ${colors.green};
    border-color: ${colors.green};
    background-color: ${colors.transGreen};
  }
`;
const StyledStatus = styled.div`
  margin-top: 30px;
`;

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const { frontmatter } = data[0].node;

  const one = () => (
    <StyledOverline style={{ transitionDelay: '100ms' }}>{frontmatter.title}</StyledOverline>
  );
  const two = () => (
    <StyledTitle style={{ transitionDelay: '200ms' }}>
      <GlitchText>{frontmatter.name}</GlitchText>
    </StyledTitle>
  );
  const three = () => (
    <StyledSubtitle style={{ transitionDelay: '300ms' }}>
      Solutions Architect <span className="separator">{'/'}/</span> Software Architect{' '}
      <span className="separator">{'/'}/</span> Software Engineer
    </StyledSubtitle>
  );
  const four = () => (
    <StyledDescription style={{ transitionDelay: '400ms' }}>
      <TypewriterText
        text="I architect resilient distributed systems and cloud-native solutions on AWS and Azure. Specializing in fault-tolerant, event-driven architectures that scale."
        speed={15}
        delay={1500}
      />
    </StyledDescription>
  );
  const five = () => (
    <div style={{ transitionDelay: '500ms' }}>
      <StyledButtons>
        <StyledEmailLink href={`mailto:${email}`}>&gt; INITIATE CONTACT</StyledEmailLink>
        <StyledDossierLink href="/#about">&gt; VIEW DOSSIER</StyledDossierLink>
      </StyledButtons>
      <StyledStatus>
        <StatusIndicator label="STATUS: AVAILABLE FOR PROJECTS" />
      </StyledStatus>
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledContainer>
      <TransitionGroup component={null}>
        {isMounted &&
          items.map((item, i) => (
            <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
              {item}
            </CSSTransition>
          ))}
      </TransitionGroup>
    </StyledContainer>
  );
};

Hero.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Hero;
