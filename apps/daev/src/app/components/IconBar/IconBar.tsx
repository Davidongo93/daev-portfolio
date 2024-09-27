'use client';
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import IconButton from '../IconButton/IconButton';

const IconBar: React.FC = () => {
  return (
    <div className="flex justify-center space-x-4 bg-black p-4">
      <IconButton href="https://github.com" icon={<FaGithub />} label="GitHub" />
      <IconButton href="https://linkedin.com" icon={<FaLinkedin />} label="LinkedIn" />
      <IconButton href="https://twitter.com" icon={<FaTwitter />} label="Twitter" />
    </div>
  );
};

export default IconBar;
