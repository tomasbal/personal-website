import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Layout } from '@components';
import styled from 'styled-components';
import { theme, mixins, media, Main } from '@styles';
const { colors, fonts, navDelay } = theme;

const StyledMainContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
`;
const StyledTitle = styled.h1`
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  font-size: 12vw;
  line-height: 1;
  text-shadow:
    0 0 30px rgba(0, 255, 200, 0.3),
    0 0 60px rgba(0, 255, 200, 0.1);
  ${media.bigDesktop`font-size: 200px;`}
  ${media.phablet`font-size: 120px;`};
`;
const StyledSubtitle = styled.h2`
  font-family: ${fonts.SFMono};
  font-size: ${theme.fontSizes.xl};
  font-weight: 400;
  color: ${colors.slate};
  margin-top: 10px;
  ${media.phablet`font-size: ${theme.fontSizes.lg};`};
`;
const StyledHomeButton = styled(Link)`
  ${mixins.bigButton};
  margin-top: 40px;
`;

const NotFoundPage = ({ location }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout location={location}>
      <TransitionGroup component={null}>
        {isMounted && (
          <CSSTransition timeout={500} classNames="fade">
            <StyledMainContainer className="fillHeight">
              <StyledTitle>404</StyledTitle>
              <StyledSubtitle>&gt; ERROR: RESOURCE_NOT_FOUND</StyledSubtitle>
              <StyledHomeButton to="/">&gt; cd /home</StyledHomeButton>
            </StyledMainContainer>
          </CSSTransition>
        )}
      </TransitionGroup>
    </Layout>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NotFoundPage;
