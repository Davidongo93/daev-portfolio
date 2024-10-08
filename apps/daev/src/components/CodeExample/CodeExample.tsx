'use client';

import React from 'react';
import {Highlight} from 'prism-react-renderer';
import {themes} from 'prism-react-renderer'; // Puedes cambiar el tema
import { codeSnippet } from './descriptionEmployee';
const CodeExample: React.FC = () => {

  return (
    <section className="bg-gray-900 text-white text-sm w-fit items-center ">
      <div className="bg-gray-900 rounded-lg shadow-lg p-1">
        <Highlight theme={themes.dracula} code={codeSnippet.trim()} language="javascript">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} p-2 rounded-lg`} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </section>
  );
};

export default CodeExample;
