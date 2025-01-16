import React from 'react';

import ROT13 from './ROT13';
import SteganografiLBS from './SteganographyLBS';
import About from './About';

export default function Home() {
  return (
    <div>
      <section id="rot13" className="py-6">
        <h2 className="text-2xl font-bold mb-4">ROT 13 <i> (rotate by 13)</i></h2>
        <ROT13 />
      </section>
      <section id="steganography" className="py-6">
        <h2 className="text-2xl font-bold mb-4">Steganografi LSB</h2>
        <SteganografiLBS />
      </section>
      <section id="about" className="py-6">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <About />
      </section>
    </div>
  );
}
