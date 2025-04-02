'use client';
import React from 'react';
import { FaGithub, FaLinkedin, FaDiscord, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import IconButton from '../IconButton/IconButton';

const IconBar: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4 p-8 px-4 lg:px-8">
      <IconButton size='small' href="https://github.com/Davidongo93" icon={<FaGithub />} label="GitHub" target="_blank" rel="noopener noreferrer" />
      <IconButton size='small' href="https://linkedin.com/in/domirandar" icon={<FaLinkedin />} label="LinkedIn" target="_blank" rel="noopener noreferrer" />
      <IconButton size='small' href="https://x.com/domirandar" icon={<FaXTwitter />} label="X" target="_blank" rel="noopener noreferrer" />
      <IconButton size='small' href="https://wa.me/+573015740156" icon={<FaWhatsapp />} label="Whatsapp" target="_blank" rel="noopener noreferrer" />
      <IconButton size='small' href="https://discordapp.com/users/1072550664762298468" icon={<FaDiscord />} label="Discord" target="_blank" rel="noopener noreferrer" />
      <IconButton size='small' href="https://www.instagram.com/davegoes2rock/" icon={<FaInstagram />} label="Instagram" target="_blank" rel="noopener noreferrer" />
    </div>
  );
};

export default IconBar;
