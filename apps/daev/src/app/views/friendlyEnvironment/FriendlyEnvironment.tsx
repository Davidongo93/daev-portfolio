// app/page.tsx (o donde esté tu componente GUI)
'use client';
import { useState } from 'react';
import CardGrid from '../../components/ProjectsGrid/ProjectsGrid';
import TerminalButton from '../../components/TerminalButton/TerminalButton';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

interface ChildComponentProps {
  onStateChange: (newValue: boolean) => void;
}

const GUI: React.FC<ChildComponentProps> = ({ onStateChange }) => {
  return (
    <div>
      {/* Header */}
      {/* <header className="p-4 border-b border-green-500 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold">[Tu Nombre]</h1>
          <nav>
            <a href="#about" className="hover:text-green-300">About</a>
            <a href="#skills" className="ml-4 hover:text-green-300">Skills</a>
            <a href="#projects" className="ml-4 hover:text-green-300">Projects</a>
            <a href="#contact" className="ml-4 hover:text-green-300">Contact</a>
          </nav>
        </div>
      </header> */}
      <Header onStateChange={onStateChange}/>

      {/* Hero Section */}
      <section id="hero" className="text-center py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-4">Welcome to My Digital Command Center</h2>
          <p className="text-lg mb-8">I'm a Full Stack Developer with a passion for creating innovative and dynamic web applications. Explore my work and learn more about my skills.</p>
          {/* <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded shadow"
            onClick={() => onStateChange(true)}
          >
           
          </button> */}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <p className="text-lg leading-relaxed">
            I'm a Full Stack Developer with extensive experience in modern web technologies. My expertise spans both front-end and back-end development, allowing me to deliver comprehensive and effective solutions.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <ul className="list-disc list-inside">
                <li>React</li>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
                <li>HTML</li>
                <li>CSS</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Backend</h3>
              <ul className="list-disc list-inside">
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>PostgreSQL</li>
              </ul>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Tools</h3>
              <ul className="list-disc list-inside">
                <li>Git</li>
                <li>Docker</li>
                <li>Webpack</li>
                <li>REST APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>
          <CardGrid />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Contact</h2>
          <form className="max-w-lg mx-auto bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-lg mb-2">Name</label>
              <input type="text" id="name" className="w-full p-3 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg mb-2">Email</label>
              <input type="email" id="email" className="w-full p-3 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-lg mb-2">Message</label>
              <textarea id="message" rows={4} className="w-full p-3 bg-gray-600 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded transition">Send</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default GUI;
