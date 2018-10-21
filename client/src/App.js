import React, { Component, Fragment } from 'react';
import LoginPage from './ui/layouts/LoginPage';
import HomePage from './ui/layouts/HomePage';
import PrivateRoute from './ui/components/PrivateRoute';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute path="/home" component={HomePage} />
        </Fragment>
      </Router>
    );
  }
}

export default App;
