
import React from 'react';
import { PixelArtIcon } from './icons/PixelArtIcon';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 bg-gray-900/70 backdrop-blur-sm border-b border-gray-700/50">
      <div className="container mx-auto flex items-center justify-center gap-4">
        <PixelArtIcon className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
        <h1 className="text-2xl md:text-4xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          Pixel Art Generator
        </h1>
      </div>
    </header>
  );
};

export default Header;
