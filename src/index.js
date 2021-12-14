import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { QueryParamProvider } from 'use-query-params';
import reportWebVitals from './reportWebVitals';

import { Router, Redirect, globalHistory } from '@reach/router';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import About from './About/About';
import Contact from './Contact/Contact';
import Projects from './Projects/Projects';

ReactDOM.render(
  <React.StrictMode>
  <QueryParamProvider reachHistory={globalHistory}>
  <Router primary={false}>
    <App path="/"/>
    <Projects  path="project"/>
    <About path="about"/>
    <Contact path="contact"/>
</Router>

</QueryParamProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
