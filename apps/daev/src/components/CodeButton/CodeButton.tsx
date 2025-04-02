'use client';

import React from 'react';
import { Highlight } from 'prism-react-renderer';
import { themes } from 'prism-react-renderer';

interface ButtonProps {
  textButton: string;
}

const CodeButton: React.FC<ButtonProps> = ({ textButton }) => {
  const handleClick = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="p-1 rounded-lg bg-gray-900 text-white text-sm w-fit items-center transition-transform transform hover:scale-105 hover:shadow-lg hover:text-green-500 cursor-pointer duration-500 ease-in-out"
    >
      <div className="bg-gray-900 rounded-lg shadow-lg p-1 overflow-hidden transition-all duration-500 ease-in-out">
        <Highlight
          theme={themes.dracula}
          code={textButton.trim()}
          language="javascript"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={`${className} p-1 rounded-sm transition-transform transform hover:scale-105 opacity-80 cursor-pointer overflow-hidden`}
              style={style}
            >
              {tokens.map((line, i) => {
                const lineProps = getLineProps({ line });
                return (
                  <div key={i} {...lineProps}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                );
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </button>
  );
};

export default CodeButton;
