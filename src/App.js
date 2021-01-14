import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Nav from './components/Nav';

import Home from './pages/Home';
import About from './pages/About';
import Algo from './pages/Algo';
import Archive from './pages/Archive';
import Posts from './pages/Posts';
import Portfolio from './pages/Portfolio';

import './App.css';

import aboutRaw from './pages/About.md';

function App() {
  const [markdownText, setMarkdownText] = useState(null);
  const readFile = (rawFile, isLoaded, setText) => {
    if (!isLoaded) {
      fetch(rawFile)
      .then(r => r.text())
      .then(text => {
        console.log('text decoded:', text);
        setText(text);
      });
    }
  }

  const loadAboutMdFile = () => {
    readFile(aboutRaw, markdownText, setMarkdownText);
  }

  const loadPostsMdFiles = () => {
    let posts = [];
  }

  loadAboutMdFile();
  loadPostsMdFiles();


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
                <About text={markdownText}/>
              </Route>
              <Route path="/algo">
                <Algo />
              </Route>
              <Route path="/posts">
                <Posts />
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

