import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled, { keyframes } from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const scanline = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`;

const StyledContainer = styled(Section)`
  position: relative;
`;

const StyledContent = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-bottom: 30px;
  a {
    ${mixins.inlineLink};
  }
`;

const StyledVault = styled.div`
  background: rgba(10, 10, 15, 0.9);
  border: 1px solid rgba(0, 255, 200, 0.12);
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  margin-top: 20px;
`;

const StyledVaultHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 255, 200, 0.08);
  font-family: ${fonts.SFMono};
  font-size: 11px;
  color: ${colors.green};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.phablet`flex-direction: column; align-items: flex-start; gap: 6px;`};
`;

const StyledQuery = styled.span`
  opacity: 0.8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledResultCount = styled.span`
  color: ${colors.slate};
  font-size: 10px;
  white-space: nowrap;
`;

const StyledTableHeader = styled.div`
  display: grid;
  grid-template-columns: 40px 60px 1fr 180px 100px 70px;
  padding: 10px 20px;
  border-bottom: 1px solid rgba(0, 255, 200, 0.1);
  font-family: ${fonts.SFMono};
  font-size: 10px;
  color: ${colors.slate};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  ${media.tablet`grid-template-columns: 40px 50px 1fr 100px 70px; `};
  ${media.phablet`grid-template-columns: 30px 1fr 70px;`};
`;

const StyledTableHeaderCell = styled.span`
  &.hide-tablet {
    ${media.tablet`display: none;`};
  }
  &.hide-phablet {
    ${media.phablet`display: none;`};
  }
`;

const StyledRow = styled.a`
  display: grid;
  grid-template-columns: 40px 60px 1fr 180px 100px 70px;
  padding: 12px 20px;
  border-bottom: 1px solid rgba(0, 255, 200, 0.04);
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  text-decoration: none;
  transition: ${theme.transition};
  position: relative;
  overflow: hidden;
  align-items: center;
  ${media.tablet`grid-template-columns: 40px 50px 1fr 100px 70px;`};
  ${media.phablet`grid-template-columns: 30px 1fr 70px; padding: 10px 16px;`};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 255, 200, 0.03);
  }

  &:hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 255, 200, 0.04), transparent);
    animation: ${scanline} 0.8s ease-out forwards;
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover::after {
      animation: none;
    }
  }

  &:focus {
    outline: 0;
    background: rgba(0, 255, 200, 0.03);
  }
`;

const StyledIndex = styled.span`
  color: ${colors.slate};
  font-size: 10px;
`;

const StyledIconCell = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  ${media.phablet`display: none;`};

  img {
    width: 36px;
    height: 36px;
    object-fit: contain;
    border-radius: 4px;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  }
`;
const StyledIconPlaceholder = styled.span`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background: rgba(0, 255, 200, 0.06);
  border: 1px solid rgba(0, 255, 200, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.SFMono};
  font-size: 10px;
  color: ${colors.green};
  opacity: 0.6;
`;

const StyledNameCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const StyledCertName = styled.span`
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.smish};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${media.phablet`font-size: ${fontSizes.xs}; white-space: normal;`};
`;

const StyledCertIssuer = styled.span`
  color: ${colors.green};
  font-size: 10px;
  opacity: 0.7;
  display: none;
  ${media.phablet`display: block;`};
`;

const StyledIssuerCell = styled.span`
  color: ${colors.slate};
  font-size: ${fontSizes.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${media.tablet`display: none;`};
`;

const StyledDateCell = styled.span`
  color: ${colors.slate};
  font-size: 11px;
  ${media.phablet`display: none;`};
`;

const StyledVerified = styled.span`
  color: ${colors.green};
  font-size: 10px;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${colors.green};
    box-shadow: 0 0 6px rgba(0, 255, 200, 0.5);
    flex-shrink: 0;
  }
`;

const StyledVaultFooter = styled.div`
  padding: 12px 20px;
  border-top: 1px solid rgba(0, 255, 200, 0.08);
  font-family: ${fonts.SFMono};
  font-size: 10px;
  color: ${colors.slate};
  display: flex;
  justify-content: space-between;
  ${media.phablet`flex-direction: column; gap: 4px;`};
`;

const CertIcon = ({ icon, name }) => {
  const [failed, setFailed] = useState(false);
  if (!icon || failed) {
    return <StyledIconPlaceholder>{'>'}_</StyledIconPlaceholder>;
  }
  return <img src={icon} alt={name} onError={() => setFailed(true)} />;
};

CertIcon.propTypes = {
  icon: PropTypes.string,
  name: PropTypes.string,
};

const Certificates = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title, certificates } = frontmatter;
  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const certCount = certificates ? certificates.length : 0;

  return (
    <StyledContainer id="certificates" ref={revealContainer}>
      <Heading>{title}</Heading>
      <StyledContent dangerouslySetInnerHTML={{ __html: html }} />

      <StyledVault>
        <StyledVaultHeader>
          <StyledQuery>
            $ SELECT * FROM credentials WHERE status = &apos;VERIFIED&apos; ORDER BY date DESC;
          </StyledQuery>
          <StyledResultCount>{certCount} rows returned</StyledResultCount>
        </StyledVaultHeader>

        <StyledTableHeader>
          <StyledTableHeaderCell>#</StyledTableHeaderCell>
          <StyledTableHeaderCell className="hide-phablet">Icon</StyledTableHeaderCell>
          <span>Credential</span>
          <StyledTableHeaderCell className="hide-tablet">Issuer</StyledTableHeaderCell>
          <StyledTableHeaderCell className="hide-phablet">Acquired</StyledTableHeaderCell>
          <span>Status</span>
        </StyledTableHeader>

        {certificates &&
          certificates.map(({ name, issuer, date, icon, url }, i) => (
            <StyledRow key={i} href={url} target="_blank" rel="noopener noreferrer">
              <StyledIndex>{String(i + 1).padStart(2, '0')}</StyledIndex>
              <StyledIconCell>
                <CertIcon icon={icon} name={name} />
              </StyledIconCell>
              <StyledNameCell>
                <StyledCertName>{name}</StyledCertName>
                <StyledCertIssuer>{issuer}</StyledCertIssuer>
              </StyledNameCell>
              <StyledIssuerCell>{issuer}</StyledIssuerCell>
              <StyledDateCell>{date}</StyledDateCell>
              <StyledVerified>VALID</StyledVerified>
            </StyledRow>
          ))}

        <StyledVaultFooter>
          <span>Keyring: /credentials/tomislav.gpg</span>
          <span>All signatures verified | Integrity: OK</span>
        </StyledVaultFooter>
      </StyledVault>
    </StyledContainer>
  );
};

Certificates.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Certificates;
