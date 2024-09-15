'use client'
import { useState, useEffect } from 'react';
import CardGrid from "../../components/ProjectsGrid/ProjectsGrid";
import TerminalButton from '../../components/TerminalButton/TerminalButton';

interface ChildComponentProps {
  onStateChange: (newValue: boolean) => void;
}

const GUI: React.FC<ChildComponentProps> = ({ onStateChange }) => {

  return (
<>
<div className='wrapper'>
<div className='container'>
  <button
  className='button-pill rounded shadow'><TerminalButton onStateChange= {onStateChange} />
  </button>
  </div>
<CardGrid/>
</div>
</>
  );
}

export default GUI;
