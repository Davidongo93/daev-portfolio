'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import BrandPlaceholder from './Brand/BrandPlaceholder';

interface PostImageProps {
  src?: string;
  alt?: string;
  className?: string;
  sizes?: string;
  fill?: boolean;
}

const isWindowsPath = (s?: string) => {
  if (!s) return false;
  // Matches C:\ or C:/ at string start
  return /^[a-zA-Z]:[\\/]/.test(s) || s.toLowerCase().startsWith('file:///');
};

export default function PostImage({ src, alt = '', className = '', sizes, fill = false }: PostImageProps) {
  const [errored, setErrored] = useState(false);

  if (!src || isWindowsPath(src) || errored) {
    return <BrandPlaceholder title={alt || 'Post image'} compact={false} />;
  }

  const isRemote = /^https?:\/\//i.test(src);
  const isLocalPublic = src.startsWith('/');

  if (isRemote) {
    // Use a plain <img> for remote URLs so onError works reliably and no remote config is needed.
    // eslint-disable-next-line @next/next/no-img-element
    return (
      // @ts-ignore - allow generic className
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErrored(true)}
        className={className}
      />
    );
  }

  if (isLocalPublic) {
    // Use Next/Image for local public assets to benefit from optimization
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className={className}
          onLoadingComplete={({ naturalWidth }) => {
            if (!naturalWidth) setErrored(true);
          }}
        />
      );
    }

    return (
      <Image
        src={src}
        alt={alt}
        width={800}
        height={450}
        sizes={sizes}
        className={className}
        onLoadingComplete={({ naturalWidth }) => {
          if (!naturalWidth) setErrored(true);
        }}
      />
    );
  }

  // As a last resort, try an <img> (covers relative paths and data URLs)
  // eslint-disable-next-line @next/next/no-img-element
  return (
    // @ts-ignore
    <img src={src} alt={alt} loading="lazy" onError={() => setErrored(true)} className={className} />
  );
}
