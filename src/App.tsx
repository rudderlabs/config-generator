import './App.scss';

import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import theme from '@css/theme';
import { stores } from '@stores/index';
import { Provider } from 'mobx-react';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import AppRouter from './AppRouter';

const App: React.FC = () => {
  const bugsnagClient = bugsnag(`${process.env.REACT_APP_BUGSNAG_API_KEY}`);
  bugsnagClient.use(bugsnagReact, React);
  const ErrorBoundary = bugsnagClient.getPlugin('react');

  return (
    <ErrorBoundary>
      <Provider {...stores}>
        <ThemeProvider theme={theme}>
          <div className="App">
            <AppRouter />
          </div>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
