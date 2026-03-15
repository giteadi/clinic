

import React from 'react';
import { Provider } from 'react-redux';
import { ClinicProvider } from './contexts/ClinicContext';
import { store, persistor } from './store/store';
import CliniqPro from './components/CliniqPro';

function App() {
  return (
    <Provider store={store}>
      <ClinicProvider>
        <CliniqPro />
      </ClinicProvider>
    </Provider>
  );
}

export default App;
