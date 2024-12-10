"use client";

import {Highlight, themes} from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "javascript" }: CodeBlockProps) {
  return (
    <Highlight code={code} language={language} theme={themes.oneLight}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} bg-gray-100 p-4 rounded mb-8 overflow-x-scroll md:overflow-auto rounded-md shadow`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
