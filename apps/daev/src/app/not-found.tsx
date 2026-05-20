'use client';
import React from 'react';
import Link from 'next/link';
import { FaHome, FaArrowRight } from 'react-icons/fa';
import { Highlight, themes } from 'prism-react-renderer';
import { useLang } from '../context/LangContext';

const goHomeCode = `const goHome = () => {
  window.location.href = '/';
};

goHome();`;

const Custom404: React.FC = () => {
  const { t } = useLang();

  return (
    <main className="relative min-h-screen bg-bg text-fore flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full text-center space-y-6 animate-fade-in">
        <p className="font-display font-bold text-[8rem] md:text-[10rem] leading-none text-accent">
          404
        </p>
        <h1 className="font-display text-2xl md:text-3xl text-fore">{t.notFound.title}</h1>
        <p className="text-muted">{t.notFound.message}</p>

        <Link
          href="/"
          className="block bg-surface-el rounded-2xl shadow-xl p-5 border border-border hover:border-accent transition group text-left"
        >
          <Highlight theme={themes.dracula} code={goHomeCode} language="javascript">
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={`${className} text-sm rounded-lg overflow-hidden bg-transparent p-0 m-0`}
                style={{ ...style, background: 'transparent' }}
              >
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
        </Link>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-bg font-semibold text-sm hover:bg-accent-hover transition-all hover:scale-105 shadow-lg"
        >
          <FaHome /> {t.notFound.back} <FaArrowRight size={12} />
        </Link>
      </div>
    </main>
  );
};

export default Custom404;
