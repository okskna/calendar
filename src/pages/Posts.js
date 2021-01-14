import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';

function Posts () {
  const [postsText, setPostText] = useState(null);

  return (
    <>
      <ReactMarkdown className="About-paragraph" >
        {`test`}
      </ReactMarkdown>
    </>
  );
}

export default Posts;