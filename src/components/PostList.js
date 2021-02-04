import { React, useEffect, useState}  from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import { Helper } from '../helper/Helper';

import ReactMarkdown from 'react-markdown';

import './PostList.css'

function PostList(props) {
  const postList = props.postList;
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   const copy = Helper.deepcopy(posts);

  //   Object.entries(props.posts).forEach(post => {
  //     const [rawTitle, rawContents] = post;
  //     // const title = Helper.postTitleDivider(rawTitle);
  //     const contents = Helper.postContentsDivider(rawContents);

  //     console.log("contents: ", contents);
  //     copy.push(contents);
  //   });
  //   setPosts(copy);
  // }, [props]);

  useEffect(() => {
    // console.log("posts: ", postList);
  }, [postList]);

  return (
    <Router>
      <div className="PostList">
        {
          postList.map((post, idx) => {
            return (
              <div className="PostList-item" key={`PostList-item-${idx}`}>
                <div className="PostList-date">
                  {new Date(post.date).toDateString()}

                </div>
                <div className="PostList-title">
                  {post.title}
                </div>
                <div className="PostList-subTitle">
                  {post.subTitle || ""}
                  {/* <ReactMarkdown className="About-paragraph" >
                    {post.text.slice(0, 50) || `Loading...`}
                  </ReactMarkdown> */}
                </div>
                <div className="PostList-categories">
                  {`# ${post.categories}` || ""}
                </div>
              </div>
            )
          })
        }
        
      </div>
    </Router>
  )
}

export default PostList;

{/* <Router>
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
    </div>
  </div>
</Router> */}
