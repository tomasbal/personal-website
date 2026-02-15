import { css } from 'styled-components';
import theme from './theme';
const { colors, fontSizes, fonts } = theme;

const prismColors = {
  bg: `#0d1117`,
  lineHighlight: `#161b22`,
  blue: `#79c0ff`,
  purple: `#d2a8ff`,
  green: `#7ee787`,
  yellow: `#e3b341`,
  orange: `#ffa657`,
  red: `#ff7b72`,
  grey: `#8b949e`,
  comment: `#8b949e99`,
};

const PrismStyles = css`
  .gatsby-highlight {
    background-color: ${prismColors.bg};
    color: ${prismColors.variable};
    border-radius: ${theme.borderRadius};
    margin: 2em 0;
    padding: 1.25em;
    overflow: auto;
    position: relative;
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.md};
    border: 1px solid rgba(0, 255, 200, 0.08);
  }

  .gatsby-highlight code[class*='language-'],
  .gatsby-highlight pre[class*='language-'] {
    height: auto !important;
    font-size: ${fontSizes.sm};
    line-height: 1.5;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 2;
    hyphens: none;
  }

  .gatsby-highlight pre[class*='language-'] {
    background-color: transparent;
    margin: 0;
    padding: 0;
    overflow: initial;
    float: left;
    min-width: 100%;
    padding-top: 2em;
  }

  .gatsby-code-title {
    padding: 1em 1.5em;
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    background-color: ${prismColors.bg};
    color: ${prismColors.grey};
    border-top-left-radius: ${theme.borderRadius};
    border-top-right-radius: ${theme.borderRadius};
    border-bottom: 1px solid ${prismColors.lineHighlight};

    & + .gatsby-highlight {
      margin-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  .gatsby-highlight-code-line {
    display: block;
    background-color: ${prismColors.lineHighlight};
    border-left: 2px solid ${colors.green};
    padding-left: calc(1em + 2px);
    padding-right: 1em;
    margin-right: -1.35em;
    margin-left: -1.35em;
  }

  .gatsby-highlight pre[class*='language-']::before {
    background: ${colors.lightestNavy};
    color: ${colors.green};
    font-size: ${fontSizes.xs};
    font-family: ${fonts.SFMono};
    line-height: 1.5;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    border-radius: 0 0 3px 3px;
    position: absolute;
    top: 0;
    left: 1.25rem;
    padding: 0.25rem 0.5rem;
  }
  .gatsby-highlight pre[class='language-javascript']::before {
    content: 'js';
  }
  .gatsby-highlight pre[class='language-js']::before {
    content: 'js';
  }
  .gatsby-highlight pre[class='language-jsx']::before {
    content: 'jsx';
  }
  .gatsby-highlight pre[class='language-graphql']::before {
    content: 'GraphQL';
  }
  .gatsby-highlight pre[class='language-html']::before {
    content: 'html';
  }
  .gatsby-highlight pre[class='language-css']::before {
    content: 'css';
  }
  .gatsby-highlight pre[class='language-mdx']::before {
    content: 'mdx';
  }
  .gatsby-highlight pre[class='language-shell']::before {
    content: 'shell';
  }
  .gatsby-highlight pre[class='language-sh']::before {
    content: 'sh';
  }
  .gatsby-highlight pre[class='language-bash']::before {
    content: 'bash';
  }
  .gatsby-highlight pre[class='language-yaml']::before {
    content: 'yaml';
  }
  .gatsby-highlight pre[class='language-markdown']::before {
    content: 'md';
  }
  .gatsby-highlight pre[class='language-json']::before,
  .gatsby-highlight pre[class='language-json5']::before {
    content: 'json';
  }
  .gatsby-highlight pre[class='language-diff']::before {
    content: 'diff';
  }
  .gatsby-highlight pre[class='language-text']::before {
    content: 'text';
  }
  .gatsby-highlight pre[class='language-flow']::before {
    content: 'flow';
  }

  .token {
    display: inline;
  }
  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${prismColors.comment};
  }
  .token.punctuation {
    color: ${prismColors.grey};
  }
  .token.namespace,
  .token.deleted {
    color: ${prismColors.red};
  }
  .token.function-name,
  .token.function,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: ${prismColors.yellow};
  }
  .token.attr-name,
  .token.operator,
  .token.rule {
    color: ${prismColors.orange};
  }
  .token.keyword,
  .token.boolean,
  .token.number,
  .token.property {
    color: ${prismColors.purple};
  }
  .token.tag,
  .token.selector,
  .token.important,
  .token.atrule,
  .token.builtin,
  .token.entity,
  .token.url {
    color: ${prismColors.blue};
  }
  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable,
  .token.inserted {
    color: ${prismColors.green};
  }
  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  .namespace {
    opacity: 0.7;
  }
`;

export default PrismStyles;
