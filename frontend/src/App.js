import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dossiers from './pages/Dossiers';
import DossierDetails from './pages/DossierDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dossiers />} />
        <Route path="/dossiers/:id" element={<DossierDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
