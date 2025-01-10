import { useToast } from '@/hooks/use-toast';

import { useState } from 'react';

export default function useCopyText() {
  const [copySuccess, setCopySuccess] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
      toast({
        title: 'Berhasil menyalin teks',
      });
    } catch (error) {
      console.error('Gagal menyalin teks:', error);
      toast({
        title: 'Gagal menyalin teks',
        variant: "destructive",
      });
    }
  };

  return { copySuccess, copyToClipboard };
}
