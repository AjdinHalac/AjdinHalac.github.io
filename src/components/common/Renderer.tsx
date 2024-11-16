import * as React from 'react';
import deepmerge from 'deepmerge';
import { Components } from 'react-markdown';
import {
  Code,
  Divider,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { chakra } from '@chakra-ui/system';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import go from 'react-syntax-highlighter/dist/cjs/languages/prism/go';
import rangeParser from 'parse-numeric-range';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { IconButton } from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';

//import theme from "../../theme";

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('go', go);

type GetCoreProps = {
  children?: React.ReactNode;
  'data-sourcepos'?: any;
};

function getCoreProps(props: GetCoreProps): any {
  return props['data-sourcepos']
    ? { 'data-sourcepos': props['data-sourcepos'] }
    : {};
}

interface Defaults extends Components {
  heading1?: Components['h1'];
  heading2?: Components['h2'];
  heading3?: Components['h3'];
  heading4?: Components['h4'];
  heading5?: Components['h5'];
  heading6?: Components['h6'];
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const syntaxTheme = oneDark;

export const defaults: Defaults = {
  a: props => {
    const { children } = props;
    return <Link color='teal' href={props.href} isExternal={props.href!.startsWith('http')}>{children}</Link>;
  },
  p: props => {
    const { children } = props;
    return <Text mb={2}>{children}</Text>;
  },
  code({ node, inline, className, ...props }: any) {
    const hasLang = /language-(\w+)/.exec(className || '');
    const hasMeta = node?.data?.meta;

    const applyHighlights: object = (applyHighlights: number) => {
      if (hasMeta) {
        const RE = /{([\d,-]+)}/;
        const metadata = node.data.meta?.replace(/\s/g, '');
        // eslint-disable-next-line
        const strlineNumbers = RE?.test(metadata) ? RE?.exec(metadata)![1] : '0';
        const highlightLines = rangeParser(strlineNumbers);
        const highlight = highlightLines;
        const data: string | null = highlight.includes(applyHighlights) ? 'highlight' : null;
        return { data };
      } else {
        return {};
      }
    };

    return hasLang ? (
      <div style={{ position: 'relative' }}>
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
        <IconButton
          aria-label="Copy"
          size="sm"
          position="absolute"
          top="8px"
          right="8px"
          icon={<CopyIcon />}
          colorScheme="teal"
          onClick={() => {
            copyToClipboard(props.children as string);
          }}
        />
      </div>
    ) : (
      <code className={className} {...props} />
    )
  },
  em: props => {
    const { children } = props;
    return <Text as="em">{children}</Text>;
  },
  blockquote: props => {
    const { children } = props;
    return (
      <Code as="blockquote" p={2}>
        {children}
      </Code>
    );
  },
  del: props => {
    const { children } = props;
    return <Text as="del">{children}</Text>;
  },
  hr: props => {
    return <Divider my={4} />;
  },
  img: Image,
  text: props => {
    const { children } = props;
    return <Text as="span">{children}</Text>;
  },
  ul: props => {
    const { children } = props;
    const attrs = getCoreProps(props);
    let Element = UnorderedList;
    let styleType = 'disc';
    return (
      <Element
        spacing={2}
        as={'ul'}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  ol: props => {
    const { children } = props;
    const attrs = getCoreProps(props);
    let Element = OrderedList;
    let styleType = 'decimal';
    return (
      <Element
        spacing={2}
        as={'ol'}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </Element>
    );
  },
  li: props => {
    const { children } = props;
    return (
      <ListItem
        {...getCoreProps(props)}
        listStyleType={'inherit'}
      >
        {children}
      </ListItem>
    );
  },
  heading1: props => {
    const { children } = props;
    return (
      <Heading
        mt={2}
        mb={1}
        as={`h1`}
        size={'2xl'}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  heading2: props => {
    const { children } = props;
    return (
      <Heading
        mt={1.5}
        mb={0.75}
        as={`h2`}
        size={'xl'}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  heading3: props => {
    const { children } = props;
    return (
      <Heading
        mt={1.25}
        mb={0.75}
        as={`h3`}
        size={'lg'}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  heading4: props => {
    const { children } = props;
    return (
      <Heading
        mt={1}
        mb={0.5}
        as={`h4`}
        size={'md'}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  heading5: props => {
    const { children } = props;
    return (
      <Heading
        mt={0.75}
        mb={0.5}
        as={`h5`}
        size={'sm'}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  heading6: props => {
    const { children } = props;
    return (
      <Heading
        mt={0.5}
        mb={0.25}
        as={`h6`}
        size={'xs'}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  pre: props => {
    const { children } = props;
    return <chakra.pre {...getCoreProps(props)}>{children}</chakra.pre>;
  },
  table: Table,
  thead: Thead,
  tbody: Tbody,
  tr: props => <Tr>{props.children}</Tr>,
  td: props => <Td>{props.children}</Td>,
  th: props => <Th>{props.children}</Th>,
};

function Renderer(theme?: Defaults, merge = true): Components {
  const elements = {
    p: defaults.p,
    em: defaults.em,
    blockquote: defaults.blockquote,
    code: defaults.code,
    del: defaults.del,
    hr: defaults.hr,
    a: defaults.a,
    img: defaults.img,
    text: defaults.text,
    ul: defaults.ul,
    ol: defaults.ol,
    li: defaults.li,
    h1: defaults.heading1,
    h2: defaults.heading2,
    h3: defaults.heading3,
    h4: defaults.heading4,
    h5: defaults.heading5,
    h6: defaults.heading6,
    pre: defaults.pre,
    table: defaults.table,
    thead: defaults.thead,
    tbody: defaults.tbody,
    tr: defaults.tr,
    td: defaults.td,
    th: defaults.th,
  };

  if (theme && merge) {
    return deepmerge(elements, theme);
  }

  return elements;
}

export default Renderer;