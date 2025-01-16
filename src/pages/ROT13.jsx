import React from 'react';
import useCopyText from '@/hooks/useCopyText.hooks';
import rotUtils from '@/utils/rot.utils';
import { ArrowRightLeft, ArrowLeftRight, Copy, CopyCheck } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ROT13() {
  const [input, setInput] = React.useState('');
  const [shift, setShift] = React.useState(13);
  const [result, setResult] = React.useState('');
  const { copySuccess, copyToClipboard } = useCopyText();
  const [isCiphertext, setIsCiphertext] = React.useState(false); // Menyimpan status apakah dalam mode ciphertext

  
  // Fungsi untuk mengubah antara plaintext dan ciphertext
  React.useEffect(() => {
    if (!isCiphertext) {
      // Enkripsi dari plaintext ke ciphertext
      setResult(rotUtils(input, Number(shift)));
    } else {
      // Dekripsi dari ciphertext ke plaintext
      setInput(rotUtils(result, -Number(shift)));
    }
  }, [input, result, shift, isCiphertext]);

  // Fungsi untuk menangani klik tombol panah untuk toggle mode
  const handleArrowClick = () => {
    setIsCiphertext(!isCiphertext); // Toggle mode antara plaintext dan ciphertext
  };
  

  return (
    <div className="space-y-4 py-5">
      
{/* Rumus: Representasi Visual Huruf ROT13 */}
<div className="rot13-visual">
      <h2>Rumus Perhitungan:</h2>
        <div className="rot13-row">
          <span className="rot13-cell bg-green-500">A</span>
          <span className="rot13-cell">B</span>
          <span className="rot13-cell">C</span>
          <span className="rot13-cell">D</span>
          <span className="rot13-cell">E</span>
          <span className="rot13-cell">F</span>
          <span className="rot13-cell">G</span>
          <span className="rot13-cell">H</span>
          <span className="rot13-cell">I</span>
          <span className="rot13-cell">J</span>
          <span className="rot13-cell">K</span>
          <span className="rot13-cell">L</span>
          <span className="rot13-cell">M</span>
        </div>
        <div className="rot13-row">
          <span className="rot13-cell bg-green-500">N</span>
          <span className="rot13-cell">O</span>
          <span className="rot13-cell">P</span>
          <span className="rot13-cell">Q</span>
          <span className="rot13-cell">R</span>
          <span className="rot13-cell">S</span>
          <span className="rot13-cell">T</span>
          <span className="rot13-cell">U</span>
          <span className="rot13-cell bg-blue-500">V</span>
          <span className="rot13-cell">W</span>
          <span className="rot13-cell">X</span>
          <span className="rot13-cell">Y</span>
          <span className="rot13-cell">Z</span>
        </div>
        <div className="rot13-word">
          <span className="rot13-cell bg-orange-500">H</span>
          <span className="rot13-cell bg-yellow-500">E</span>
          <span className="rot13-cell bg-orange-500">L</span>
          <span className="rot13-cell bg-orange-500">L</span>
          <span className="rot13-cell bg-green-500">O</span>
        </div>
        <div className="rot13-word">
          <span className="rot13-cell bg-green-500">U</span>
          <span className="rot13-cell bg-yellow-500">R</span>
          <span className="rot13-cell bg-yellow-500">Y</span>
          <span className="rot13-cell bg-yellow-500">Y</span>
          <span className="rot13-cell bg-green-500">B</span>
        </div>
      </div> <br /> <br />
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="grid w-full gap-2">
          <Label className="text-md flex justify-between" htmlFor="plaintext">
            {isCiphertext ? 'Cipher Text' : 'Plain Text'}
            <button
              onClick={handleArrowClick}
              className="flex items-center gap-2"
            >
              {isCiphertext ? (
                <ArrowLeftRight />
              ) : (
                <ArrowRightLeft />
              )}
            </button>
          </Label>
          <Textarea
            placeholder="Masukkan teks..."
            id="plaintext"
            value={isCiphertext ? result : input}
            onChange={(e) =>
              isCiphertext ? setResult(e.target.value) : setInput(e.target.value)
            }
            className="h-36"
          />
        </div>
        <div className="grid w-full gap-2">
          <Label className="text-md flex justify-between" htmlFor="chipertext">
            {isCiphertext ? 'Plain Text' : 'Cipher Text'}
            <button
              onClick={() => copyToClipboard(result)} // Copy teks sesuai mode
              className="hover:text-blue-800 transition"
            >
              {copySuccess ? (
                <CopyCheck className="text-green-500" />
              ) : (
                <Copy />
              )}
            </button>
          </Label>
          <Textarea
            readOnly
            placeholder=""
            id="chipertext"
            value={isCiphertext ? input : result}
            onChange={(e) => {}}
            className="h-36"
          />
        </div>
      </div>

      

      {/* Styling */}
      <style jsx>{`
        .rot13-visual {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .rot13-row {
          display: flex;
          gap: 4px;
        }
        .rot13-word {
          display: flex;
          gap: 4px;
        }
        .rot13-cell {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid black;
          font-weight: bold;
        }
        .bg-green-500 {
          background-color: #34d399;
        }
        .bg-yellow-500 {
          background-color: #f59e0b;
        }
        .bg-orange-500 {
          background-color: #fb923c;
        }
        .bg-blue-500 {
          background-color: #3b82f6;
        }
      `}</style>
    </div>
  );
}
