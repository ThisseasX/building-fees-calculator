import React from 'react';
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { store } from 'state';
import { theme } from 'theme';
import globalStyles from './globalStyles';

type Props = {
  children: React.ReactNode;
};

const AppSetup = ({ children }: Props) => (
  <Provider store={store}>
    <GlobalStyles styles={globalStyles} />
    <CssBaseline />

    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Provider>
);

export default AppSetup;
