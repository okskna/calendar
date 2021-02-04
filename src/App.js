// react
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// components
import Nav from './components/Nav';

// pages
import Home from './pages/Home';
import About from './pages/About';
import Algo from './pages/Algo';
import Archive from './pages/Archive';
import Posts from './pages/Posts';
import Posts2 from './pages/Posts2';
import Posts3 from './pages/Posts3';
import Portfolio from './pages/Portfolio';

// css
import './App.css';

function App() {
  
  return (
    <Router>
      <div className="App">
        <div className="App-root">
          <header className="App-header">
            <Nav />
          </header>
          <div className="App-contents">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/algo">
                <Algo />
              </Route>
              <Route path="/posts">
                {/* <Posts count={12}/> */}
                <Posts3 count={12}/>
              </Route>
              <Route path="/archive">
                <Archive />
              </Route>
              <Route path="/portfolio">
                <Portfolio />
              </Route>
            </Switch>
          </div>
          {/* <footer className="App-footer">
            This is footer!
          </footer> */}
          
        </div>
      </div>
    </Router>
  );
}

export default App;

