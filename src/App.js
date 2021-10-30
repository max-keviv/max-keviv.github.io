import logo from './image/background.png';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import About from './About/About';
import Contact from './Contact/Contact';
import Projects from './Projects/Projects';
function App() {
  return (
    <div className="App">
    <div className="bg-image galaxy">
    <section class="wrapper">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="title">
            <br/>
        </div>
    </section>
    <Header/>
    <Body/>
    <Footer/>
    </div>
    </div>
  );
}

export default App;
