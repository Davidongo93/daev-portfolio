'use client';
import React from 'react';
import { FaGithub, FaLinkedin, FaDiscord, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { siteConfig } from '../../config/site';

interface IconBarProps {
  className?: string;
}

/**
 * Social links as full-colour brand tiles. GitHub and X are black-and-white
 * brands, so they take the foreground colour and flip with the theme.
 */
const IconBar: React.FC<IconBarProps> = ({ className = '' }) => {
  const items = [
    { href: siteConfig.links.github, Icon: FaGithub, label: 'GitHub', tile: 'bg-fore text-bg' },
    { href: siteConfig.links.linkedin, Icon: FaLinkedin, label: 'LinkedIn', tile: 'bg-[#0A66C2] text-white' },
    { href: siteConfig.links.twitter, Icon: FaXTwitter, label: 'X / Twitter', tile: 'bg-fore text-bg' },
    { href: siteConfig.whatsapp, Icon: FaWhatsapp, label: 'WhatsApp', tile: 'bg-[#25D366] text-white' },
    { href: siteConfig.links.discord, Icon: FaDiscord, label: 'Discord', tile: 'bg-[#5865F2] text-white' },
    {
      href: siteConfig.links.instagram,
      Icon: FaInstagram,
      label: 'Instagram',
      tile: 'bg-[radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)] text-white',
    },
  ];

  return (
    <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
      {items.map(({ href, Icon, label, tile }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl shadow-md transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110 ${tile}`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
};

export default IconBar;
