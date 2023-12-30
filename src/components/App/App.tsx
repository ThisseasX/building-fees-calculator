import React from 'react';
import { AppSetup, AppLayout } from 'layouts';
import { Main } from 'components';

const App = () => (
  <AppSetup>
    <AppLayout>
      <Main />
    </AppLayout>
  </AppSetup>
);

export default App;
