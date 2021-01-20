import { React, useEffect, useState}  from 'react';

import { Helper } from '../helper/Helper';

import ReactMarkdown from 'react-markdown';

import './PostList.css'

function PostList(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const copy = Helper.deepcopy(posts);

    Object.entries(props.posts).forEach(post => {
      const [rawTitle, rawContents] = post;
      // const title = Helper.postTitleDivider(rawTitle);
      const contents = Helper.postContentsDivider(rawContents);

      console.log("contents: ", contents);
      copy.push(contents);
    });
    setPosts(copy);
  }, [props]);

  useEffect(() => {
    console.log("posts: ", posts);
  }, [posts]);

  return (
    <>
    <div className="PostList">
      {
        posts.map(post => {
          return (
            <div className="PostList-item">
              <div className="PostList-date">
                {new Date(post.date).toDateString()}

              </div>
              <div className="PostList-title">
                {post.title}
              </div>
              <div className="PostList-subTitle">
                {post.subTitle || ""}
                {/* <ReactMarkdown className="About-paragraph" >
                  {post.contents.slice(0, 20) || `Loading...`}
                </ReactMarkdown> */}
              </div>
            </div>
          )
        })
      }
      
    </div>
    </>
  )
}

export default PostList;
