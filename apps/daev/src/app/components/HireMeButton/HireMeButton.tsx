'use client';

import React from 'react';
import {Highlight} from 'prism-react-renderer';
import {themes} from 'prism-react-renderer'; // Puedes cambiar el tema
const hireMe = `hireMe();`
const HireMeButton: React.FC = () => {
    const handleClick = () => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' }); // Scroll suave a la sección
        }
      };

  return (
    <button onClick={handleClick}
     className="p-1 rounded-lg bg-gray-900 text-white text-sm w-fit items-center">
      <div className="bg-gray-900 rounded-lg shadow-lg p-1">
        <Highlight theme={themes.dracula} code={hireMe.trim()} language="javascript">
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={`${className} p-1 rounded-sm  hover:scale-110 opacity-70 cursor-pointer`} style={style}>
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
    </button>
  );
};

export default HireMeButton;
