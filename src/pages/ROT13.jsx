import React from 'react';

import rotUtils from '@/utils/rot.utils';


export default function ROT13() {
  const [input, setInput] = React.useState('');
  const [shift, setShift] = React.useState(13);
  const [result, setResult] = React.useState('');

  const handleConvert = () => {
    setResult(rotUtils(input, Number(shift)));
  };

  return (
    <div>
      <div className="space-y-4">
        <h1>ROT 13</h1>
        <div>
          <label>
            Pergeseran:
            <input
              type="number"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            />
          </label>
        </div>
        <div>
          <textarea
            rows="4"
            cols="50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Masukkan teks..."
          />
        </div>
        <button onClick={handleConvert}>Convert (Encrypt/Decrypt)</button>
        <h3>Hasil:</h3>
        <p>{result}</p>
      </div>
    </div>
  );
}
