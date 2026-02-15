import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import sr from '@utils/sr';
import { srConfig, github } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
`;
const StyledFlexContainer = styled.div`
  ${mixins.flexBetween};
  align-items: flex-start;
  ${media.tablet`display: block;`};
`;
const StyledContent = styled.div`
  width: 60%;
  max-width: 480px;
  ${media.tablet`width: 100%;`};
  a {
    ${mixins.inlineLink};
  }
`;
const StyledTerminalSkills = styled.div`
  margin-top: 40px;
  background: rgba(10, 10, 15, 0.95);
  border: 1px solid rgba(0, 255, 200, 0.12);
  border-radius: ${theme.borderRadius};
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
  line-height: 1.7;
  overflow: hidden;
`;
const StyledTitleBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: rgba(0, 255, 200, 0.04);
  border-bottom: 1px solid rgba(0, 255, 200, 0.08);
`;
const StyledDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${props => props.$color};
  opacity: 0.8;
`;
const StyledTitleText = styled.span`
  color: ${colors.slate};
  font-size: 11px;
  margin-left: 6px;
  flex: 1;
`;
const StyledInfoIcon = styled.span`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(0, 255, 200, 0.25);
  color: ${colors.green};
  font-size: 10px;
  font-family: ${fonts.SFMono};
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  opacity: 0.6;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &:hover > span {
    visibility: visible;
    opacity: 1;
  }
`;
const StyledTooltip = styled.span`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: rgba(10, 10, 15, 0.95);
  border: 1px solid rgba(0, 255, 200, 0.15);
  border-radius: 3px;
  padding: 6px 10px;
  font-size: 11px;
  font-style: normal;
  color: ${colors.slate};
  white-space: nowrap;
  z-index: 10;
  transition:
    opacity 0.2s,
    visibility 0.2s;
`;
const StyledStaticContent = styled.div`
  padding: 20px 24px;
`;
const StyledScanHeader = styled.div`
  color: ${colors.green};
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const StyledScanMeta = styled.div`
  color: ${colors.slate};
  margin-bottom: 12px;
  font-size: 11px;
`;
const StyledPortTable = styled.div`
  font-family: ${fonts.SFMono};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 40px;
  ${media.phablet`grid-template-columns: 1fr;`};
`;
const StyledPortHeader = styled.div`
  display: grid;
  grid-template-columns: 90px 70px 1fr;
  color: ${colors.slate};
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.1em;
  border-bottom: 1px solid rgba(0, 255, 200, 0.08);
  padding-bottom: 4px;
  margin-bottom: 4px;
`;
const StyledPortRow = styled.div`
  display: grid;
  grid-template-columns: 90px 70px 1fr;
  font-size: ${fontSizes.xs};
  line-height: 1.8;
`;
const StyledPort = styled.span`
  color: ${colors.lightestSlate};
`;
const StyledState = styled.span`
  color: ${colors.green};
`;
const StyledService = styled.span`
  color: ${colors.slate};
`;
const StyledScanResult = styled.div`
  margin-top: 10px;
  color: ${colors.green};
  font-size: 11px;
`;
const StyledLangBlock = styled.div`
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(0, 255, 200, 0.08);
`;
const StyledLangHeader = styled.div`
  color: ${colors.green};
  margin-bottom: 8px;
  font-size: 11px;
`;
const StyledLangList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
const StyledLangTag = styled.span`
  font-size: ${fontSizes.xs};
  color: ${colors.lightestSlate};
  background: rgba(0, 255, 200, 0.06);
  border: 1px solid rgba(0, 255, 200, 0.1);
  padding: 3px 10px;
  border-radius: 2px;
  letter-spacing: 0.03em;
`;
const StyledLangNote = styled.div`
  margin-top: 10px;
  font-size: 10px;
  color: ${colors.slate};
  opacity: 0.6;
`;
const StyledInteractiveSection = styled.div`
  border-top: 1px solid rgba(0, 255, 200, 0.08);
`;
const StyledOutput = styled.div`
  padding: 16px 24px 0;
  max-height: 350px;
  overflow-y: auto;
  line-height: 1.7;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 200, 0.15);
    border-radius: 2px;
  }
`;
const StyledLine = styled.div`
  margin-bottom: 2px;
  white-space: pre-wrap;
  word-break: break-word;

  &.command {
    color: ${colors.lightestSlate};
  }
  &.response {
    color: ${colors.slate};
  }
  &.accent {
    color: ${colors.green};
  }
  &.header {
    color: ${colors.green};
    margin-top: 4px;
    margin-bottom: 2px;
  }
  &.error {
    color: ${colors.magenta || '#ff2d6b'};
  }
  &.muted {
    color: ${colors.slate};
    opacity: 0.6;
  }
`;
const StyledPromptLine = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 24px 12px;
`;
const StyledPrompt = styled.span`
  color: ${colors.green};
  margin-right: 8px;
  white-space: nowrap;
  font-size: ${fontSizes.xs};
`;
const StyledInputWrapper = styled.div`
  position: relative;
  flex: 1;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
`;
const StyledInput = styled.input`
  background: none;
  border: none;
  color: ${colors.lightestSlate};
  font-family: inherit;
  font-size: inherit;
  outline: none;
  width: 100%;
  caret-color: ${colors.green};
  position: relative;
  z-index: 1;

  &::placeholder {
    color: ${colors.slate};
    opacity: 0.4;
  }
`;
const StyledGhost = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  white-space: nowrap;
  color: transparent;

  span {
    color: ${colors.slate};
    opacity: 0.35;
  }
`;
const StyledHint = styled.div`
  padding: 10px 24px;
  font-size: 11px;
  color: ${colors.slate};
  opacity: 0.5;
  border-top: 1px solid rgba(0, 255, 200, 0.04);
  ${media.phablet`font-size: 10px;`};
`;
const StyledPic = styled.div`
  position: relative;
  width: 40%;
  max-width: 300px;
  margin-left: 60px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;
const StyledAvatar = styled(GatsbyImage)`
  position: relative;
  filter: grayscale(100%) contrast(1);
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
`;
const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  background-color: transparent;
  margin-left: -20px;
  &:hover,
  &:focus {
    &:after {
      top: 15px;
      left: 15px;
    }
    ${StyledAvatar} {
      filter: none;
    }
  }
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 255, 200, 0.1) 0%, transparent 100%);
    z-index: 3;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
    border: 2px solid ${colors.green};
    top: 20px;
    left: 20px;
    z-index: -1;
    box-shadow: 0 0 15px rgba(0, 255, 200, 0.1);
  }
`;

const skillScanData = [
  { port: '443/tcp', state: 'active', service: 'aws-cloud-platform' },
  { port: '8443/tcp', state: 'active', service: 'azure-services' },
  { port: '6443/tcp', state: 'active', service: 'kubernetes-orch' },
  { port: '2376/tcp', state: 'active', service: 'docker-engine' },
  { port: '8080/tcp', state: 'active', service: 'api-gateway-design' },
  { port: '5000/tcp', state: 'active', service: 'microservices-arch' },
  { port: '4566/tcp', state: 'active', service: 'serverless-runtime' },
  { port: '4040/tcp', state: 'active', service: 'iac-terraform' },
  { port: '9090/tcp', state: 'active', service: 'security-arch' },
  { port: '8888/tcp', state: 'active', service: 'ci-cd-pipeline' },
  { port: '3000/tcp', state: 'active', service: 'system-design-hld' },
  { port: '5432/tcp', state: 'active', service: 'distributed-systems' },
  { port: '27017/tcp', state: 'active', service: 'data-modeling' },
  { port: '9200/tcp', state: 'active', service: 'observability-stack' },
  { port: '8081/tcp', state: 'active', service: 'event-driven-arch' },
  { port: '4222/tcp', state: 'active', service: 'message-queues' },
  { port: '8500/tcp', state: 'active', service: 'service-mesh' },
  { port: '3100/tcp', state: 'active', service: 'domain-driven-design' },
  { port: '5601/tcp', state: 'active', service: 'cost-optimization' },
  { port: '9443/tcp', state: 'active', service: 'disaster-recovery' },
];

const COMMANDS = {
  help: () => [
    { text: 'Available commands:', cls: 'header' },
    { text: '' },
    { text: '  whoami          Who is Tomislav Balabanov', cls: 'response' },
    { text: '  skills          Core technical competencies', cls: 'response' },
    { text: '  experience      Career timeline summary', cls: 'response' },
    { text: '  certifications  Professional credentials', cls: 'response' },
    { text: '  stack           Preferred tech stack', cls: 'response' },
    { text: '  education       Academic background', cls: 'response' },
    { text: '  contact         How to reach me', cls: 'response' },
    { text: '  neofetch        System info display', cls: 'response' },
    { text: '  clear           Clear terminal output', cls: 'response' },
    { text: '' },
    { text: 'Tip: try "neofetch" for the full overview', cls: 'muted' },
  ],

  whoami: () => [
    { text: 'Tomislav Balabanov', cls: 'accent' },
    { text: '' },
    { text: 'Solutions Architect // Software Architect // Software Engineer', cls: 'response' },
    { text: 'Based in Skopje, North Macedonia', cls: 'response' },
    { text: '' },
    { text: 'I design and build distributed, fault-tolerant systems — cloud,', cls: 'response' },
    { text: 'on-premise, or bare metal. I specialize in platform-agnostic', cls: 'response' },
    { text: 'architecture, security-first engineering, and high-throughput', cls: 'response' },
    { text: 'infrastructure that scales to millions of requests.', cls: 'response' },
  ],

  skills: () => [
    { text: 'cat /etc/skills.conf', cls: 'muted' },
    { text: '' },
    { text: '[cloud]', cls: 'header' },
    { text: '  AWS, Azure, Serverless, Multi-Region, Terraform, CloudFormation', cls: 'response' },
    { text: '[architecture]', cls: 'header' },
    { text: '  DDD, System Design, TOGAF, Distributed Systems, Data Modeling', cls: 'response' },
    { text: '[engineering]', cls: 'header' },
    { text: '  Microservices, REST/GraphQL/gRPC, Event-Driven, CI/CD, SOLID', cls: 'response' },
    { text: '[security]', cls: 'header' },
    { text: '  IAM, Zero Trust, VPC Design, OWASP, GDPR/SOC2, Threat Modeling', cls: 'response' },
    { text: '[operations]', cls: 'header' },
    { text: '  Kubernetes, Docker, Observability, DR/HA, Incident Response', cls: 'response' },
    { text: '[integration]', cls: 'header' },
    { text: '  EIP, ETL Pipelines, Webhooks, Legacy Modernization', cls: 'response' },
  ],

  experience: () => [
    { text: 'git log --oneline --career', cls: 'muted' },
    { text: '' },
    { text: '2022-now  Solutions Architect @ PCG International', cls: 'response' },
    { text: '          AWS/Azure architecture, Well-Architected reviews', cls: 'muted' },
    { text: '2020-now  CTO @ Savory & Partners', cls: 'response' },
    { text: '          Multi-region enterprise infra, GDPR compliance', cls: 'muted' },
    { text: '2019-now  Senior Solution Architect @ Relish Studio', cls: 'response' },
    { text: '          Cloud-native microservice platforms, data pipelines', cls: 'muted' },
    { text: '2018-now  Lead Cloud Architect @ F2N2', cls: 'response' },
    { text: '          ML pipeline architecture, disinformation analysis', cls: 'muted' },
    { text: '2018-now  Security Architect @ MOST', cls: 'response' },
    { text: '          Defense-in-depth, automated incident response', cls: 'muted' },
    { text: '2018-now  Founder & Solutions Architect @ Devlent', cls: 'response' },
    { text: '          Cloud architecture studio, multi-industry clients', cls: 'muted' },
  ],

  certifications: () => [
    { text: 'gpg --list-keys --keyring /credentials/', cls: 'muted' },
    { text: '' },
    { text: '  [VALID] AWS Solutions Architect Professional', cls: 'accent' },
    { text: '  [VALID] AWS Solutions Architect Associate', cls: 'accent' },
    { text: '  [VALID] AWS Security Specialty', cls: 'accent' },
    { text: '  [VALID] Azure Administrator', cls: 'accent' },
    { text: '  [VALID] Google Cybersecurity Certificate', cls: 'accent' },
    { text: '  [VALID] AWS Cloud Practitioner', cls: 'accent' },
    { text: '  [VALID] Linux Foundation Certified Systems Engineer', cls: 'accent' },
    { text: '  [VALID] Computer and Hacking Forensics', cls: 'accent' },
    { text: '  [VALID] Developing Secure Software (CSA)', cls: 'accent' },
    { text: '  [VALID] Understanding OWASP Top 10 (Cisco)', cls: 'accent' },
    { text: '' },
    { text: '  + 5 additional AWS Knowledge & Partner badges', cls: 'muted' },
    { text: '  15 credentials total | All signatures verified', cls: 'response' },
  ],

  stack: () => [
    { text: 'cat /proc/stack', cls: 'muted' },
    { text: '' },
    { text: 'PLATFORMS   AWS, Azure, On-Premise, Bare Metal', cls: 'response' },
    { text: 'IaC         Terraform, CloudFormation, AWS CDK, Pulumi', cls: 'response' },
    { text: 'CONTAINERS  Docker, Kubernetes, ECS/EKS, ArgoCD', cls: 'response' },
    { text: 'LANGUAGES   Go, TypeScript, JavaScript, C#/.NET, Python', cls: 'response' },
    { text: 'BACKEND     Node.js, Express, NestJS, Spring Boot, FastAPI', cls: 'response' },
    { text: 'FRONTEND    React, Next.js, Vue.js, Gatsby, Redux', cls: 'response' },
    { text: 'DATA        PostgreSQL, DynamoDB, MongoDB, Redis, Elasticsearch', cls: 'response' },
    { text: 'MESSAGING   SQS, SNS, EventBridge, Kafka, RabbitMQ', cls: 'response' },
    { text: 'CI/CD       GitHub Actions, Jenkins, CodePipeline', cls: 'response' },
    { text: 'MONITORING  CloudWatch, Datadog, Grafana, Prometheus', cls: 'response' },
  ],

  education: () => [
    { text: 'cat /var/log/education', cls: 'muted' },
    { text: '' },
    { text: 'Faculty of Computer Science and Engineering — Skopje', cls: 'accent' },
    { text: '  Engineer in Computer Science and Engineering (2015 - 2018)', cls: 'response' },
    { text: '  Department of Application of E-Technologies', cls: 'muted' },
    { text: '' },
    { text: 'CS50 — Harvard University', cls: 'accent' },
    { text: '  Computer and Information Sciences (2018)', cls: 'response' },
    { text: '' },
    { text: '  + 15 professional certifications across AWS, Azure, and security', cls: 'muted' },
  ],

  contact: () => [
    { text: 'Transmission channels:', cls: 'header' },
    { text: '' },
    { text: '  EMAIL     tomislav@tomislavbalabanov.me', cls: 'response' },
    { text: '  GITHUB    github.com/tomasbal', cls: 'response' },
    { text: '  LINKEDIN  linkedin.com/in/tomislavbalabanov', cls: 'response' },
    { text: '' },
    { text: '  Response time: < 24 hours', cls: 'muted' },
  ],

  neofetch: () => [
    { text: '' },
    { text: '    ╔══════════════════╗', cls: 'accent' },
    { text: '    ║  T . BALABANOV   ║     OS:       Solutions Architect', cls: 'accent' },
    { text: '    ║  ┌──────────┐    ║     Kernel:   Software Engineering', cls: 'accent' },
    { text: '    ║  │ >_       │    ║     Uptime:   8+ years', cls: 'accent' },
    { text: '    ║  │   ████   │    ║     Packages: 15 certifications', cls: 'accent' },
    { text: '    ║  │   ████   │    ║     Shell:    AWS / Azure / Terraform', cls: 'accent' },
    { text: '    ║  │          │    ║     DE:       Microservices + DDD', cls: 'accent' },
    { text: '    ║  └──────────┘    ║     WM:       Event-Driven Arch', cls: 'accent' },
    { text: '    ║                  ║     Terminal: Kubernetes / Docker', cls: 'accent' },
    { text: '    ╚══════════════════╝     CPU:      Always Running', cls: 'accent' },
    { text: '                             Memory:   Distributed Systems', cls: 'accent' },
    { text: '                             Disk:     Fault-Tolerant', cls: 'accent' },
    { text: '                             Network:  Multi-Region HA', cls: 'accent' },
    { text: '' },
  ],
};

const About = ({ data }) => {
  const { frontmatter, html } = data[0].node;
  const { title, avatar } = frontmatter;
  const avatarImage = getImage(avatar);
  const revealContainer = useRef(null);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = useCallback(cmd => {
    const trimmed = cmd.trim().toLowerCase();
    const promptLine = { text: `visitor@tomislavbalabanov:~$ ${cmd}`, cls: 'command' };

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      setHistory(prev => [...prev, promptLine, ...handler()]);
    } else if (trimmed === '') {
      setHistory(prev => [...prev, promptLine]);
    } else {
      setHistory(prev => [
        ...prev,
        promptLine,
        {
          text: `bash: ${trimmed}: command not found. Type "help" for available commands.`,
          cls: 'error',
        },
      ]);
    }

    if (trimmed) {
      setCmdHistory(prev => [trimmed, ...prev]);
    }
    setHistoryIndex(-1);
  }, []);

  const allCommands = useMemo(() => [...Object.keys(COMMANDS), 'clear'], []);

  const suggestion = useMemo(() => {
    const val = input.toLowerCase().trim();
    if (!val) return '';
    const match = allCommands.find(cmd => cmd.startsWith(val) && cmd !== val);
    return match || '';
  }, [input, allCommands]);

  const handleKeyDown = e => {
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setInput(suggestion);
      }
    } else if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const newIndex = Math.min(historyIndex + 1, cmdHistory.length - 1);
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(cmdHistory[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setHistory([]);
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <StyledContainer id="about" ref={revealContainer}>
      <Heading>{title}</Heading>
      <StyledFlexContainer>
        <StyledContent>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </StyledContent>
        <StyledPic>
          <StyledAvatarLink href={github}>
            {avatarImage && (
              <StyledAvatar
                image={avatarImage}
                alt="Avatar"
                loading="eager"
                imgStyle={{ opacity: 1 }}
              />
            )}
          </StyledAvatarLink>
        </StyledPic>
      </StyledFlexContainer>

      <StyledTerminalSkills onClick={focusInput}>
        <StyledTitleBar>
          <StyledDot $color="#ff5f57" />
          <StyledDot $color="#febc2e" />
          <StyledDot $color="#28c840" />
          <StyledTitleText>visitor@tomislavbalabanov:~</StyledTitleText>
          <StyledInfoIcon>
            i
            <StyledTooltip>
              This terminal is interactive — scroll down and type a command
            </StyledTooltip>
          </StyledInfoIcon>
        </StyledTitleBar>

        <StyledStaticContent>
          <StyledScanHeader>$ nmap -sV localhost --script=skills-audit</StyledScanHeader>
          <StyledScanMeta>
            Starting skill-scan at {new Date().getFullYear()}-02-15 03:47 UTC
          </StyledScanMeta>
          <StyledPortHeader>
            <span>PORT</span>
            <span>STATE</span>
            <span>SERVICE</span>
          </StyledPortHeader>
          <StyledPortTable>
            {skillScanData.map((skill, i) => (
              <StyledPortRow key={i}>
                <StyledPort>{skill.port}</StyledPort>
                <StyledState>{skill.state}</StyledState>
                <StyledService>{skill.service}</StyledService>
              </StyledPortRow>
            ))}
          </StyledPortTable>
          <StyledScanResult>
            {skillScanData.length} services detected | all ports operational
          </StyledScanResult>

          <StyledLangBlock>
            <StyledLangHeader>$ cat /etc/languages-frameworks.conf</StyledLangHeader>
            <StyledLangList>
              <StyledLangTag>Go</StyledLangTag>
              <StyledLangTag>TypeScript</StyledLangTag>
              <StyledLangTag>JavaScript</StyledLangTag>
              <StyledLangTag>C# / .NET</StyledLangTag>
              <StyledLangTag>Python</StyledLangTag>
              <StyledLangTag>React.js</StyledLangTag>
              <StyledLangTag>Next.js</StyledLangTag>
              <StyledLangTag>Vue.js</StyledLangTag>
              <StyledLangTag>Node.js</StyledLangTag>
              <StyledLangTag>NestJS</StyledLangTag>
              <StyledLangTag>Express</StyledLangTag>
              <StyledLangTag>Redux</StyledLangTag>
              <StyledLangTag>Gatsby</StyledLangTag>
              <StyledLangTag>Spring Boot</StyledLangTag>
              <StyledLangTag>FastAPI</StyledLangTag>
              <StyledLangTag>Gin</StyledLangTag>
              <StyledLangTag>AWS CDK</StyledLangTag>
              <StyledLangTag>Kong</StyledLangTag>
              <StyledLangTag>ArgoCD</StyledLangTag>
            </StyledLangList>
            <StyledLangNote>Technology agnostic — right tool for the right problem.</StyledLangNote>
          </StyledLangBlock>
        </StyledStaticContent>

        <StyledInteractiveSection>
          {history.length > 0 && (
            <StyledOutput ref={outputRef}>
              {history.map((line, i) => (
                <StyledLine key={i} className={line.cls || 'response'}>
                  {line.text}
                </StyledLine>
              ))}
            </StyledOutput>
          )}
          <StyledPromptLine>
            <StyledPrompt>visitor@tomislavbalabanov:~$</StyledPrompt>
            <StyledInputWrapper>
              <StyledInput
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command..."
                spellCheck={false}
                autoComplete="off"
                autoCapitalize="off"
              />
              {suggestion && input.trim() && (
                <StyledGhost aria-hidden="true">
                  {input}
                  <span>{suggestion.slice(input.trim().length)}</span>
                </StyledGhost>
              )}
            </StyledInputWrapper>
          </StyledPromptLine>
          <StyledHint>
            Tab to autocomplete | Try: help, whoami, neofetch, skills, experience, stack, contact
          </StyledHint>
        </StyledInteractiveSection>
      </StyledTerminalSkills>
    </StyledContainer>
  );
};

About.propTypes = {
  data: PropTypes.array.isRequired,
};

export default About;
