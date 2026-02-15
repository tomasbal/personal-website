import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig, email } from '@config';
import { TerminalWindow } from '@components/effects';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 100px;
  a {
    ${mixins.inlineLink};
  }
`;
const StyledHeading = styled(Heading)`
  display: block;
  color: ${colors.green};
  font-size: ${fontSizes.md};
  font-family: ${fonts.SFMono};
  font-weight: normal;
  margin-bottom: 20px;
  justify-content: center;
  ${media.desktop`font-size: ${fontSizes.sm};`};
  &:before {
    bottom: 0;
    font-size: ${fontSizes.sm};
    ${media.desktop`font-size: ${fontSizes.smish};`};
  }
  &:after {
    display: none;
  }
`;
const StyledTitle = styled.h4`
  margin: 0 0 20px;
  font-size: 60px;
  ${media.desktop`font-size: 50px;`};
  ${media.tablet`font-size: 40px;`};
`;
const StyledTerminalContent = styled.div`
  text-align: left;
  color: ${colors.slate};
  line-height: 2;

  .status-line {
    color: ${colors.green};
    font-size: ${fontSizes.smish};
  }
  .prompt {
    color: ${colors.green};
  }
`;
const StyledEmailLink = styled.a`
  ${mixins.bigButton};
  margin-top: 30px;
  display: inline-block;
`;

const Contact = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title } = frontmatter;
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContainer id="contact" ref={revealContainer}>
      <StyledHeading>Establish Connection</StyledHeading>

      <StyledTitle>{title}</StyledTitle>

      <TerminalWindow title="contact@tomislavbalabanov:~">
        <StyledTerminalContent>
          <div className="status-line">&gt; CONNECTION PROTOCOL: READY</div>
          <div className="status-line">&gt; RESPONSE TIME: &lt; 24 HOURS</div>
          <div className="status-line">&gt; ENCRYPTION: ENABLED</div>
          <br />
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </StyledTerminalContent>
      </TerminalWindow>

      <StyledEmailLink href={`mailto:${email}`} target="_blank" rel="nofollow noopener noreferrer">
        &gt; SEND TRANSMISSION
      </StyledEmailLink>
    </StyledContainer>
  );
};

Contact.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Contact;
