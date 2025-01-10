import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import React from 'react';

import Home from './pages/Home.jsx';
import ROT13 from './pages/ROT13.jsx';
import StenografiLBS from './pages/SteganographyLBS.jsx';

import MainLayout from './layouts/main.layouts.jsx';

function App() {
  return (
    <>
      <Router>
        <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rot13" element={<ROT13 />} />
          <Route path="/stenografi" element={<StenografiLBS />} />
        </Routes>
        </MainLayout>
      </Router>
    </>
  );
}

export default App;
