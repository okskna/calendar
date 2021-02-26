import { React, useEffect, useState}  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import { Helper } from '../helper/Helper';

import ReactMarkdown from 'react-markdown';

import './PostList.css'

function Post(props) {
  const post = props.post;
  const { topicId } = useParams();
  console.log(props);
  return (
    <div>
      {topicId}
      {/* {post.text} */}
    </div>
  )
}

function PostListTemp (props) {
  const {postList, path} = props.postList;
              
  return (
    <div>
    {
      (postList || []).map((post, idx) => {
      console.log(path);
      return (
        <Link to={`${path}/${post.title}`}>
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
        </Link>
        )
      })
    }
    </div>
  );
  
}

function PostList(props) {
  const postList = props.postList;
  const setSelPost = props.setSelPost;
  
  const { path, url } = useRouteMatch();


  useEffect(() => {
    console.log("postList updated!");
  }, [props.postList]);

  return (
    // <Router>
      <div className="PostList">
        {/* <Switch>
          <Route exact path={`${path}`}>
            
          </Route> */}
          {
            postList.map((post, idx) => {
            return (
              <Link to={`${path}/${post.title}`} onClick={() => setSelPost(post.title)} >
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
              </Link>
              )
            })
          }
          
        
      </div>
    
  )
}

export default PostList;

// http://localhost:3000/posts/%22[effective%20js]%20item%202.%20js%EC%97%90%EC%84%9C%EC%9D%98%20%EB%B6%80%EB%8F%99%20%EC%86%8C%EC%88%98%EC%A0%90%20%EC%88%AB%EC%9E%90%22
// http://localhost:3000/posts/%22[effective%20js]%20item%204.%20%EA%B0%9D%EC%B2%B4%20%EB%9E%98%ED%8D%BC%EB%B3%B4%EB%8B%A4%20%EC%9B%90%EC%8B%9C%20%EB%8D%B0%EC%9D%B4%ED%84%B0%ED%98%95%EC%9D%84%20%EC%9A%B0%EC%84%A0%EC%8B%9C%ED%95%98%EB%9D%BC.%22


/*
return (
    <Router>
      <div className="PostList">
        <Switch>
          <Route exact path={`${path}`}>
            {
              postList.map((post, idx) => {
              console.log(path);
              return (
                <Link to={`${path}/${post.title}`}>
                  <div className="PostList-item" key={`PostList-item-${idx}`}>
                    <div className="PostList-date">
                      {new Date(post.date).toDateString()}
                    </div>
                    <div className="PostList-title">
                      {post.title}
                    </div>
                    <div className="PostList-subTitle">
                      {post.subTitle || ""}
                      { <ReactMarkdown className="About-paragraph" >
                        {post.text.slice(0, 50) || `Loading...`}
                      </ReactMarkdown> }
                    </div>
                    <div className="PostList-categories">
                      {`# ${post.categories}` || ""}
                    </div>
                  </div>
                </Link>
                )
              })
            }
          </Route>
          {
            postList.map((post, idx) => {
              // console.log(post);
              return (
                <Route path={`${path}/:topicId`}>
                  <Post post={post}/>
                  
                </Route>
              )
            })
          }
        </Switch>
      </div>
    </Router>
  )
*/