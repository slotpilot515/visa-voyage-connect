// src/components/layout/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full p-4 bg-gray-900 text-white flex flex-col items-center gap-2 shadow">
      <h1 className="text-3xl font-bold">SlotPilot</h1>
      <p className="text-sm text-gray-300">Your trusted hub for visa support and travel companions</p>
      <div className="flex gap-4 mt-2 text-sm">
        <a href="https://whatsapp.com/channel/0029VaPCws2002T41zrJOa2V" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
          WhatsApp
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">
          Instagram
        </a>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          Telegram
        </a>
      </div>
    </header>
  );
};

export default Header;