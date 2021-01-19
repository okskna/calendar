import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';

import './Posts.css';

function Posts (props) {
  const posts = props.posts;

  return (
    <>
      <div className="Posts">
        {
          Object.entries(posts).map((titleContent, idx) => {
            return (
              <div className={`Posts-post ${idx}`}>
                <div className="Posts-post-title">
                  {titleContent[0]}
                </div>
                {/* <ReactMarkdown className="Posts-paragraph" >
                  {titleContent[1]}
                </ReactMarkdown> */}
              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default Posts;