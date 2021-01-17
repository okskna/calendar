import React from 'react';
import ReactMarkdown from 'react-markdown';
import './About.css';

function About (props) {
  return (
    <>
      <div className="About">
        <span className="About-title">김선관은 프론트엔드 개발자가 되는 중입니다.</span>
        <ReactMarkdown className="About-paragraph" >
          {props.text || `Loading...`}
        </ReactMarkdown>
        <div className="About-icons-wrapper">
          <span className="en">
            <a href="https://github.com/okskna">Github</a> / <a href="mailto:okskna@gmail.com">okskna@gmail.com</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default About;