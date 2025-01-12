import React, { useState, useRef, useCallback } from 'react';
import { ArrowRightLeft, ArrowLeftRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const BITS_PER_PIXEL = 3;
const NULL_TERMINATOR = '00000000';

export default function SteganografiLSB() {
  // State untuk menyimpan data aplikasi
  const [state, setState] = useState({
    image: null,
    previewEncode: null,
    text: '',
    encodedImage: null,
    decodedMessage: '',
    isEncodeMode: true,
    error: '',
    binaryMessage: ''
  });

  // Referensi untuk canvas
  const originalCanvasRef = useRef(null);
  const processCanvasRef = useRef(null);

  // Fungsi untuk mengkonversi teks ke binary
  const textToBinary = useCallback((text) => {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('') + NULL_TERMINATOR;
  }, []);

  // Fungsi untuk mengkonversi binary ke teks
  const binaryToText = useCallback((binary) => {
    const bytes = binary.match(/.{1,8}/g) || [];
    let text = '';
    
    for (const byte of bytes) {
      if (byte === NULL_TERMINATOR) break;
      text += String.fromCharCode(parseInt(byte, 2));
    }
    
    return text;
  }, []);

  // Handler untuk upload gambar
  const handleImageUpload = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = URL.createObjectURL(file);
      const image = await createImageBitmap(file);
      
      const canvas = originalCanvasRef.current;
      if (!canvas) return;

      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext('2d');
      
      context?.drawImage(image, 0, 0);
      
      setState(prev => ({
        ...prev,
        image: imageUrl,
        previewEncode: state.isEncodeMode ? canvas.toDataURL('image/png') : null,
        error: ''
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Gagal memuat gambar: ' + error.message
      }));
    }
  }, [state.isEncodeMode]);

  // Fungsi untuk encoding LSB
  const encodeLSB = useCallback(() => {
    if (!state.text) {
      setState(prev => ({ ...prev, error: 'Silakan masukkan pesan terlebih dahulu' }));
      return;
    }

    const canvas = originalCanvasRef.current;
    const processCanvas = processCanvasRef.current;
    if (!canvas || !processCanvas) {
      setState(prev => ({ ...prev, error: 'Silakan pilih gambar terlebih dahulu' }));
      return;
    }

    try {
      const context = canvas.getContext('2d');
      const processContext = processCanvas.getContext('2d');
      if (!context || !processContext) throw new Error('Tidak dapat mengakses context canvas');

      const width = canvas.width;
      const height = canvas.height;
      processCanvas.width = width;
      processCanvas.height = height;

      const imageData = context.getImageData(0, 0, width, height);
      const pixels = imageData.data;

      const binaryMsg = textToBinary(state.text);
      
      if (binaryMsg.length > (width * height * BITS_PER_PIXEL)) {
        throw new Error('Pesan terlalu panjang untuk gambar yang dipilih');
      }

      const messagePixels = new Uint8ClampedArray(pixels);
      let bitIndex = 0;

      for (let i = 0; i < messagePixels.length && bitIndex < binaryMsg.length; i += 4) {
        for (let j = 0; j < BITS_PER_PIXEL && bitIndex < binaryMsg.length; j++) {
          messagePixels[i + j] = (messagePixels[i + j] & 0xFE) | parseInt(binaryMsg[bitIndex]);
          bitIndex++;
        }
      }

      const messageImageData = new ImageData(messagePixels, width, height);
      processContext.putImageData(messageImageData, 0, 0);
      
      setState(prev => ({
        ...prev,
        encodedImage: processCanvas.toDataURL('image/png'),
        binaryMessage: binaryMsg,
        error: ''
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error dalam proses encoding: ' + error.message
      }));
    }
  }, [state.text, textToBinary]);

  // Fungsi untuk decoding LSB
  const decodeLSB = useCallback(() => {
    const canvas = originalCanvasRef.current;
    if (!canvas) {
      setState(prev => ({ ...prev, error: 'Silakan pilih gambar untuk didecode' }));
      return;
    }

    try {
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Tidak dapat mengakses context canvas');

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      let binary = '';
      for (let i = 0; i < pixels.length; i += 4) {
        for (let j = 0; j < BITS_PER_PIXEL; j++) {
          binary += pixels[i + j] & 1;
        }
      }

      setState(prev => ({
        ...prev,
        decodedMessage: binaryToText(binary),
        error: ''
      }));

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Error dalam proses decoding: ' + error.message
      }));
    }
  }, [binaryToText]);

  // Handler untuk tombol proses
  const handleProcess = useCallback(() => {
    state.isEncodeMode ? encodeLSB() : decodeLSB();
  }, [state.isEncodeMode, encodeLSB, decodeLSB]);

  // Handler untuk download gambar
  const handleDownload = useCallback(() => {
    if (!state.encodedImage) return;
    
    const link = document.createElement('a');
    link.href = state.encodedImage;
    link.download = 'gambar_tersandi.png';
    link.click();
  }, [state.encodedImage]);

  // Handler untuk pergantian mode
  const handleModeSwitch = useCallback(() => {
    setState(prev => ({
      ...prev,
      isEncodeMode: !prev.isEncodeMode,
      error: '',
      decodedMessage: '',
      encodedImage: null,
      binaryMessage: ''
    }));
  }, []);

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header dan Tombol Switch Mode */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">
          Mode: {state.isEncodeMode ? 'Penyandian' : 'Pembacaan'}
        </h2>
        <Button
          variant="outline"
          onClick={handleModeSwitch}
          className="w-full sm:w-auto flex items-center justify-center gap-2"
        >
          {state.isEncodeMode ? 
            <><ArrowRightLeft className="h-4 w-4" />Ganti ke Mode Pembacaan</> : 
            <><ArrowLeftRight className="h-4 w-4" />Ganti ke Mode Penyandian</>
          }
        </Button>
      </div>

      {/* Pesan Error */}
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      {/* Bagian Upload */}
      <div className="space-y-4">
        <div className="grid gap-4">
          <label className="font-medium">Unggah Gambar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold 
                     file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>

        {/* Preview Gambar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="hidden">
            <canvas ref={originalCanvasRef} />
            <canvas ref={processCanvasRef} />
          </div>
          
          {state.isEncodeMode && state.previewEncode && (
            <div className="space-y-2">
              <h3 className="font-medium">Gambar Asli</h3>
              <img 
                src={state.previewEncode} 
                alt="Preview Encode" 
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
          {!state.isEncodeMode && state.image && (
            <div className="space-y-2">
              <h3 className="font-medium">Gambar untuk Dibaca</h3>
              <img 
                src={state.image} 
                alt="Preview Decode" 
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Input Pesan untuk Mode Encode */}
      {state.isEncodeMode && (
        <div className="space-y-2">
          <label className="font-medium">Pesan Rahasia</label>
          <Textarea
            value={state.text}
            onChange={(e) => setState(prev => ({ ...prev, text: e.target.value }))}
            placeholder="Ketik pesan yang ingin disisipkan ke dalam gambar"
            className="min-h-[100px] w-full"
          />
        </div>
      )}

      {/* Tombol Proses */}
      <Button
        onClick={handleProcess}
        className="w-full sm:w-auto"
        disabled={!state.image || (state.isEncodeMode && !state.text)}
      >
        {state.isEncodeMode ? 'Sisipkan Pesan' : 'Baca Pesan'}
      </Button>

      {/* Bagian Hasil */}
      {state.isEncodeMode && state.encodedImage && (
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Gambar Hasil Penyandian</h3>
            <img 
              src={state.encodedImage} 
              alt="Hasil Encode" 
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
          {state.binaryMessage && (
            <div className="space-y-2">
              <h3 className="font-medium">Pesan dalam Bentuk Biner</h3>
              <Textarea
                value={state.binaryMessage}
                readOnly
                className="h-[100px] w-full font-mono text-sm"
              />
            </div>
          )}
          <Button
            onClick={handleDownload}
            className="w-full sm:w-auto"
            variant="secondary"
          >
            Unduh Gambar Tersandi
          </Button>
        </div>
      )}

      {!state.isEncodeMode && state.decodedMessage && (
        <div className="space-y-2">
          <h3 className="font-medium">Pesan Tersembunyi</h3>
          <Textarea
            value={state.decodedMessage}
            readOnly
            className="h-[100px] w-full"
          />
        </div>
      )}
    </div>
  );
}