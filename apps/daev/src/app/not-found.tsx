'use client'
import React from 'react';
import Link from 'next/link';
import HeroSection from './components/HeroSection/HeroSection';
import { Highlight } from 'prism-react-renderer';
import { themes } from 'prism-react-renderer';

const goHomeCode = `
  const goHome = () => {
    window.location.href = '/';
  };
  
  goHome();
`;

const Custom404: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center text-white">
      {/* Hero Section with background image */}
      <HeroSection />
      
      <div className="relative z-10 text-center bg-gray-900 opacity-70  h-min w-min rounded-sm">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Oops! The page you are looking for does not exist.</p>

        {/* Code Block with Prism highlighting */}
        <Link href="/" passHref>
        <div className="bg-gray-900 opacity-95 z-auto rounded-lg shadow-lg p-4  hover:scale-105 transition-transform duration-300 ease-in-out">
          <Highlight theme={themes.dracula} code={goHomeCode.trim()} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={`${className} p-4 rounded-lg overflow-hidden`} style={style}>
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
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
