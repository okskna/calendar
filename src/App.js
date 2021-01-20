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
import Portfolio from './pages/Portfolio';

// css
import './App.css';

// file import 
import aboutRaw from './pages/About.md';
import fileListRaw from './tools/fileList.txt'

// etc
import Helper from './helper/Helper';

function App() {
  const readFile = (rawFile, isLoaded, setText) => {
    if (!isLoaded) {
      fetch(rawFile)
      .then(r => r.text())
      .then(text => {
        setText(text);
        // console.log(text);
      });
    }
  }

  const loadAboutMdFile = () => {
    readFile(aboutRaw, markdownText, setMarkdownText);
  }

  const loadPostsMdFileList = () => {
    readFile(fileListRaw, fileListText, setFileListText);
  }

  const loadPostsMdFiles = () => {
    if (!!fileListText) {
      const fileArray = fileListText.split(' ');
      fileArray[fileArray.length - 1] = fileArray[fileArray.length - 1].slice(0, -1); // fileList.txt EOF(?) 삭제
      // console.log(fileArray);
      
      const files = fileArray.map(file => {
        // console.log("1. Get file path and import: ", `./_posts/${file}`);
        return import(`./_posts/${file}`);
      });

      let ret = Promise.all(files);
      ret
      .then(moduleList => {
        // console.log("2. moduleList: ", moduleList);
        return Promise.all(moduleList.map(module => {
          return fetch(module.default)
          .then(raw => raw.text())
          // .then(text => )
        }))
      })
      .then(textList => {
        // console.log("4. textList: ", textList);
        // let postsCopy = Helper.deepcopy(posts);
        let postsCopy = Object.assign({}, posts);
        textList.forEach((text, idx) => {
          // postsCopy.title = fileArray[idx];
          // postsCopy.contents = text;
          postsCopy[fileArray[idx]] = text;
        })
        // console.log("5. posts ", postsCopy);
        setPosts(postsCopy);
      })
      .catch(err => console.log("err: ", err));
    }
  }

  const [markdownText, setMarkdownText] = useState(null);
  useEffect(() => {
    loadAboutMdFile();
  }, []);

  const [fileListText, setFileListText] = useState(null);
  useEffect(() => {
    loadPostsMdFileList();
  }, []);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (!!fileListText)
      loadPostsMdFiles();
  }, [fileListText]);
  
  useEffect(() => {
    // console.log("Posts update: ", posts);
  }, [posts]);
  
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
                <Posts posts={posts}/>
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

