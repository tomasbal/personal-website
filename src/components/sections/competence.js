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
const StyledPanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
  ${media.desktop`grid-template-columns: repeat(2, 1fr);`};
  ${media.tablet`grid-template-columns: 1fr;`};
`;
const StyledPanel = styled.div`
  background: rgba(10, 10, 15, 0.9);
  border: 1px solid rgba(0, 255, 200, 0.08);
  border-radius: ${theme.borderRadius};
  padding: 20px;
  transition: ${theme.transition};
  &:hover {
    border-color: rgba(0, 255, 200, 0.2);
  }
`;
const StyledPanelPrompt = styled.div`
  font-family: ${fonts.SFMono};
  font-size: 11px;
  color: ${colors.green};
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
`;
const StyledCursor = styled.span`
  display: inline-block;
  width: 7px;
  height: 14px;
  background: ${colors.green};
  opacity: 0.5;
`;
const StyledServiceList = styled.div`
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
`;
const StyledServiceRow = styled.div`
  display: grid;
  grid-template-columns: 14px 1fr auto;
  gap: 8px;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid rgba(0, 255, 200, 0.04);
  &:last-child {
    border-bottom: none;
  }
`;
const StyledDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: inline-block;
  background: ${colors.green};
  box-shadow: 0 0 6px rgba(0, 255, 200, 0.5);
`;
const StyledServiceName = styled.span`
  color: ${colors.lightestSlate};
`;
const StyledServiceStatus = styled.span`
  color: ${colors.green};
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.08em;
`;
const StyledPanelFooter = styled.div`
  font-family: ${fonts.SFMono};
  font-size: 10px;
  color: ${colors.slate};
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(0, 255, 200, 0.06);
`;

const skillCategories = [
  {
    command: '$ systemctl status cloud-arch',
    skills: [
      { name: 'AWS (EC2, Lambda, S3, RDS, ECS)' },
      { name: 'Azure (VMs, Functions, AKS)' },
      { name: 'Serverless Architecture' },
      { name: 'IaC / Terraform / CloudFormation' },
      { name: 'Multi-Region Deployment' },
      { name: 'Cost Optimization / FinOps' },
    ],
    footer: 'Active since 2018 | 0 incidents',
  },
  {
    command: '$ systemctl status architecture',
    skills: [
      { name: 'Domain-Driven Design (DDD)' },
      { name: 'System Design / HLD & LLD' },
      { name: 'TOGAF / Architecture Frameworks' },
      { name: 'Distributed Systems Patterns' },
      { name: 'Data Modeling / Schema Design' },
      { name: 'Technical Decision Records' },
    ],
    footer: 'Active since 2016 | 0 regressions',
  },
  {
    command: '$ systemctl status engineering',
    skills: [
      { name: 'Microservices / Service Mesh' },
      { name: 'API Design (REST, GraphQL, gRPC)' },
      { name: 'Event-Driven / Message Queues' },
      { name: 'CI/CD Pipelines' },
      { name: 'Clean Architecture / SOLID' },
      { name: 'Performance Engineering' },
    ],
    footer: 'Active since 2016 | 0 downtime',
  },
  {
    command: '$ systemctl status security',
    skills: [
      { name: 'IAM & Zero Trust Policies' },
      { name: 'Network Security / VPC Design' },
      { name: 'OWASP Top 10 / AppSec' },
      { name: 'Compliance (GDPR, SOC2)' },
      { name: 'Threat Modeling / Risk Analysis' },
      { name: 'Secrets Management / Vault' },
    ],
    footer: 'Active since 2018 | 0 breaches',
  },
  {
    command: '$ systemctl status operations',
    skills: [
      { name: 'Kubernetes / Container Orch' },
      { name: 'Docker / Containerization' },
      { name: 'Monitoring / Observability' },
      { name: 'Disaster Recovery / HA' },
      { name: 'Incident Response / Runbooks' },
      { name: 'Capacity Planning / Scaling' },
    ],
    footer: 'Active since 2017 | 99.9% uptime',
  },
  {
    command: '$ systemctl status integration',
    skills: [
      { name: 'Enterprise Integration Patterns' },
      { name: 'ETL / Data Pipelines' },
      { name: 'Webhook / Event Bus Design' },
      { name: 'Third-Party API Integration' },
      { name: 'Legacy System Modernization' },
      { name: 'Cross-Platform Interop' },
    ],
    footer: 'Active since 2017 | 0 sync failures',
  },
];

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
      <StyledPanelGrid>
        {skillCategories.map((category, i) => (
          <StyledPanel key={i}>
            <StyledPanelPrompt>
              <span>{category.command}</span>
              <StyledCursor />
            </StyledPanelPrompt>
            <StyledServiceList>
              {category.skills.map((skill, j) => (
                <StyledServiceRow key={j}>
                  <StyledDot />
                  <StyledServiceName>{skill.name}</StyledServiceName>
                  <StyledServiceStatus>running</StyledServiceStatus>
                </StyledServiceRow>
              ))}
            </StyledServiceList>
            <StyledPanelFooter>{category.footer}</StyledPanelFooter>
          </StyledPanel>
        ))}
      </StyledPanelGrid>
    </StyledContainer>
  );
};

Competence.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Competence;
