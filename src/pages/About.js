import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';

import './About.css';

import raw from './About.md';


function About () {
  const [markdownText, setMarkdownText] = useState(null);
  fetch(raw)
  .then(r => r.text())
  .then(text => {
    console.log('text decoded:', text);
    setMarkdownText(text);
  });
  
  return (
    <>
      <div className="About">
        <span className="About-title">김선관은 프론트엔드 개발자가 되는 중입니다.</span>
        <ReactMarkdown className="About-paragraph" >
          {markdownText || `Loading...`}
        </ReactMarkdown>
        <div className="About-icons-wrapper">
          <span className="en">
            <a href="https://github.com/okskna">Github</a> / <a href="mailto:okskna@gmail.com">Email</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default About;