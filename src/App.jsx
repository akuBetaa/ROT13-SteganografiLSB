import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import React from 'react';

import Home from './pages/Home.jsx';
import ROT13 from './pages/ROT13.jsx';
import StenografiLBS from './pages/StenografiLBS.jsx';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rot13" element={<ROT13 />} />
          <Route path="/stenografi" element={<StenografiLBS />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
