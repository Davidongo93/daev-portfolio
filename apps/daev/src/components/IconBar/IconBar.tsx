'use client';
import React from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { siteConfig } from '../../config/site';

interface IconBarProps {
  className?: string;
}

const IconBar: React.FC<IconBarProps> = ({ className = '' }) => {
  const items = [
    { href: siteConfig.links.github, Icon: FaGithub, label: 'GitHub', color: '' },
    { href: siteConfig.links.linkedin, Icon: FaLinkedin, label: 'LinkedIn', color: '' },
    { href: siteConfig.links.twitter, Icon: FaXTwitter, label: 'X / Twitter', color: '' },
    { href: siteConfig.whatsapp, Icon: FaWhatsapp, label: 'WhatsApp', color: 'text-[#25D366]' },
    { href: siteConfig.links.discord, Icon: FaDiscord, label: 'Discord', color: '' },
    { href: siteConfig.links.instagram, Icon: FaInstagram, label: 'Instagram', color: '' },
  ];

  return (
    <div className={`flex justify-center gap-4 flex-wrap ${className}`}>
      {items.map(({ href, Icon, label, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className={`${color || 'text-muted'} hover:text-accent hover:scale-110 transition-all duration-200 text-xl`}
        >
          <Icon />
        </a>
      ))}
    </div>
  );
};

export default IconBar;
