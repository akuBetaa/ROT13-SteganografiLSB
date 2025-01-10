import React from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import ROT13 from './ROT13';
import SteganografiLBS from './SteganographyLBS';

export default function Home() {
  return (
    <div className="">
      <Tabs defaultValue="rot13" className="w-full">
        <TabsList>
          <TabsTrigger value="rot13">ROT 13</TabsTrigger>
          <TabsTrigger value="steganography">Steganografi LBS</TabsTrigger>
        </TabsList>
        <TabsContent value="rot13">
          <ROT13 />
        </TabsContent>
        <TabsContent value="steganography">
          <SteganografiLBS />
        </TabsContent>
      </Tabs>
    </div>
  );
}
