import React from 'react';
import { AppSetup, AppLayout } from 'layouts';
import { FeesArea, ResidentsArea } from 'components';

const App = () => (
  <AppSetup>
    <AppLayout>
      <FeesArea />
      <ResidentsArea />
    </AppLayout>
  </AppSetup>
);

export default App;
