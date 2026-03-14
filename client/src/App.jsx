

import React from 'react';
import { ClinicProvider } from './contexts/ClinicContext';
import CliniqPro from './components/CliniqPro';

function App() {
  return (
    <ClinicProvider>
      <CliniqPro />
    </ClinicProvider>
  );
}

export default App;
