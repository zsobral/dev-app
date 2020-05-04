import React from "react";
import ReactMarkdown from "react-markdown";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const CodeBlock = (props) => (
  <Highlight
    {...defaultProps}
    code={props.value}
    language={props.language}
    theme={theme}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
);

export const Markdown = (props) => {
  return <ReactMarkdown renderers={{ code: CodeBlock }} {...props} />;
};
