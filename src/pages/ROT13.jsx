import useCopyText from '@/hooks/useCopyText.hooks';
import rotUtils from '@/utils/rot.utils';
import { ArrowRightLeft, ArrowLeftRight, Copy, CopyCheck } from 'lucide-react';

import React from 'react';

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
            onChange={(e) => isCiphertext ? setResult(e.target.value) : setInput(e.target.value)} 
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
    </div>
  );
}
