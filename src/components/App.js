/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch, Route } from 'react-router-dom';

import HomePageContainer from './HomePageContainer';
import NotFoundPage from './NotFoundPage';
import settings from 'project/settings.yml';
const mainSettings = settings.big_picture.main;
const extraSettings = settings.big_picture.extra;

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        <Switch>
          <Route exact path={`/`} component={HomePageContainer} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
