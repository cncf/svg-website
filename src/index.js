// Set up your application entry point here...
/* eslint-disable import/default */

import 'current-device';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import configureStore, { history } from './store/configureStore';
import Root from './components/Root';
import './styles/theme.scss';
import ReactGA from 'react-ga';
require('favicon.png'); // Tell webpack to load favicon.png
const store = configureStore();
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

if (process.env.NODE_ENV !== 'production') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  whyDidYouUpdate(React);
}

import "./styles/roboto.css";
render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

//Todo: move this to a better place
if (window.GA) {
  ReactGA.initialize(window.GA);
  ReactGA.pageview(window.location.pathname + window.location.search);
  history.listen(function(location) {
    ReactGA.pageview(location.pathname + window.location.search);
  });
}


if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
