import React from 'react';

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-60 bg-gray-800 text-white p-4">
      <h1 className="text-3xl text-cyan-400 font-bold mb-8">BAVKrypt</h1><hr />
      <ul className="space-y-4 mt-5">
        <li className="hover:text-cyan-400 hover:bg-gray-700 rounded px-2 py-1 transition duration-200">
          <a href="#rot13">ROT 13</a>
        </li>
        <li className="hover:text-cyan-400 hover:bg-gray-700 rounded px-2 py-1 transition duration-200">
          <a href="#steganography">Steganografi LSB</a>
        </li>
        <li className="hover:text-cyan-400 hover:bg-gray-700 rounded px-2 py-1 transition duration-200">
          <a href="#about">About</a>
        </li>
      </ul>
    </div>
  );
}
