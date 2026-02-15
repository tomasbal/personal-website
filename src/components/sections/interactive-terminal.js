import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 900px;
  margin: 0 auto;
`;

const StyledTerminal = styled.div`
  background: rgba(10, 10, 15, 0.95);
  border: 1px solid rgba(0, 255, 200, 0.12);
  border-radius: ${theme.borderRadius};
  overflow: hidden;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.xs};
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
`;

const StyledOutput = styled.div`
  padding: 16px 20px;
  max-height: 420px;
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
  padding: 8px 20px 12px;
  border-top: 1px solid rgba(0, 255, 200, 0.06);
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
  padding: 10px 20px;
  font-size: 11px;
  color: ${colors.slate};
  opacity: 0.5;
  border-top: 1px solid rgba(0, 255, 200, 0.04);
  ${media.phablet`font-size: 10px;`};
`;

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
    { text: '  clear           Clear terminal', cls: 'response' },
    { text: '' },
    { text: 'Tip: try "neofetch" for the full overview', cls: 'muted' },
  ],

  whoami: () => [
    { text: 'Tomislav Balabanov', cls: 'accent' },
    { text: '' },
    { text: 'Solutions Architect // Software Architect // Software Engineer', cls: 'response' },
    { text: 'Based in Skopje, North Macedonia', cls: 'response' },
    { text: '' },
    { text: 'I design and build distributed, fault-tolerant systems on AWS', cls: 'response' },
    { text: 'and Azure. I specialize in cloud-native architecture, security-', cls: 'response' },
    { text: 'first engineering, and high-availability infrastructure that', cls: 'response' },
    { text: 'scales to millions of requests.', cls: 'response' },
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
    { text: '2019-now  Senior Solution Architect @ Relish Studio', cls: 'response' },
    { text: '          Cloud-native microservice platforms, data pipelines', cls: 'muted' },
    { text: '2018-now  Lead Cloud Architect @ F2N2', cls: 'response' },
    { text: '          ML pipeline architecture, disinformation analysis', cls: 'muted' },
    { text: '2018-now  Security Architect @ MOST', cls: 'response' },
    { text: '          Defense-in-depth, automated incident response', cls: 'muted' },
    { text: '2018-now  Founder & Solutions Architect @ Devlent', cls: 'response' },
    { text: '          Cloud architecture studio, multi-industry clients', cls: 'muted' },
    { text: '2018-now  Principal Cloud Architect @ Savory & Partners', cls: 'response' },
    { text: '          Multi-region enterprise infra, GDPR compliance', cls: 'muted' },
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
    { text: '  [VALID] Developing Secure Software (CSA)', cls: 'accent' },
    { text: '  [VALID] Understanding OWASP Top 10 (Cisco)', cls: 'accent' },
    { text: '' },
    { text: '  + 5 additional AWS Knowledge & Partner badges', cls: 'muted' },
    { text: '  13 credentials total | All signatures verified', cls: 'response' },
  ],

  stack: () => [
    { text: 'cat /proc/stack', cls: 'muted' },
    { text: '' },
    { text: 'CLOUD       AWS, Azure, GCP (familiar)', cls: 'response' },
    { text: 'IaC         Terraform, CloudFormation, Pulumi', cls: 'response' },
    { text: 'CONTAINERS  Docker, Kubernetes, ECS/EKS, Fargate', cls: 'response' },
    { text: 'LANGUAGES   JavaScript/TypeScript, Python, Go, Java', cls: 'response' },
    { text: 'BACKEND     Node.js, Express, NestJS, Spring Boot', cls: 'response' },
    { text: 'FRONTEND    React, Gatsby, Next.js', cls: 'response' },
    { text: 'DATA        PostgreSQL, DynamoDB, Redis, Elasticsearch', cls: 'response' },
    { text: 'MESSAGING   SQS, SNS, EventBridge, Kafka, RabbitMQ', cls: 'response' },
    { text: 'CI/CD       GitHub Actions, Jenkins, CodePipeline', cls: 'response' },
    { text: 'MONITORING  CloudWatch, Datadog, Grafana, Prometheus', cls: 'response' },
  ],

  education: () => [
    { text: 'cat /var/log/education', cls: 'muted' },
    { text: '' },
    { text: 'Continuous self-directed learning across distributed systems,', cls: 'response' },
    { text: 'cloud architecture, and security engineering. Validated through', cls: 'response' },
    { text: '13 professional certifications and years of production systems', cls: 'response' },
    { text: 'experience across enterprise environments.', cls: 'response' },
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
    { text: '    ║  │   ████   │    ║     Packages: 13 certifications', cls: 'accent' },
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

const WELCOME = [
  { text: 'Welcome to tomislavbalabanov.me interactive terminal', cls: 'accent' },
  { text: 'Type "help" for available commands.', cls: 'muted' },
  { text: '' },
];

const InteractiveTerminal = () => {
  const [history, setHistory] = useState(WELCOME);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef(null);
  const inputRef = useRef(null);
  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

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
    <StyledContainer id="terminal" ref={revealContainer}>
      <Heading>Interactive Terminal</Heading>
      <StyledTerminal onClick={focusInput}>
        <StyledTitleBar>
          <StyledDot $color="#ff5f57" />
          <StyledDot $color="#febc2e" />
          <StyledDot $color="#28c840" />
          <StyledTitleText>visitor@tomislavbalabanov:~</StyledTitleText>
        </StyledTitleBar>
        <StyledOutput ref={outputRef}>
          {history.map((line, i) => (
            <StyledLine key={i} className={line.cls || 'response'}>
              {line.text}
            </StyledLine>
          ))}
        </StyledOutput>
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
      </StyledTerminal>
    </StyledContainer>
  );
};

export default InteractiveTerminal;
