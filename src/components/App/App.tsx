import React from 'react';
import { AppSetup, AppLayout } from 'layouts';
import { FeesArea, FeesTable, ResidentsArea } from 'components';

const App = () => (
  <AppSetup>
    <AppLayout>
      <FeesArea />
      <ResidentsArea />
      <FeesTable />
    </AppLayout>
  </AppSetup>
);

export default App;
