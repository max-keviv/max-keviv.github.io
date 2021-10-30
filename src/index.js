import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import About from './About/About';
import Contact from './Contact/Contact';
import Projects from './Projects/Projects';

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
<Switch>
<Route path="/">
    <App /></Route>
<Route path="/projects"><Projects /></Route>
<Route path="/about"><About/></Route>
<Route path="/contact"><Contact/></Route>
</Switch>
</BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
