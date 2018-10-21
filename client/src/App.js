import React, { Component } from 'react';
import LoginPage from "./ui/layouts/LoginPage";
import HomePage from './ui/layouts/HomePage';
// import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return <HomePage/>
    // <LoginPage/>;
  }
}

export default App;
