// Must be included here, otherwise it runs into: https://github.com/webpack/webpack/issues/215
// Must also imported as first so it's the first style in the generated bundle in production build
import 'styles/core.scss';
import 'antd/dist/antd.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createStore from 'store/createStore';
import lifecycle from 'containers/LifecycleContainer';
import App from 'components/App';
import { initApp } from 'modules/InitModule';

// ========================================================
// Store Instantiation
// ========================================================
// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  // eslint-disable-next-line react/jsx-filename-extension
  const AppComponent = lifecycle(App, { componentWillMount: initApp() });

  ReactDOM.render(
    // https://github.com/gaearon/react-hot-loader/issues/666
    // eslint-disable-next-line react/jsx-filename-extension
    <AppContainer warnings={false}>
      <AppComponent store={store} />
    </AppContainer>,
    MOUNT_NODE,
  );
};

// This code is excluded from production bundle
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      // eslint-disable-next-line import/no-extraneous-dependencies,global-require
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        renderError(error);
      }
    };
  }
}

// ========================================================
// Go!
// ========================================================
render();
