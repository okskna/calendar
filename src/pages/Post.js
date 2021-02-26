import { React, useEffect, useState}  from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import ally_dark from 'react-syntax-highlighter/dist/esm/styles/prism/a11y-dark'
import gfm from 'remark-gfm'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

import ReactMarkdown from 'react-markdown';

import './Post.css';

const renderers = {
  code: (props) => {
    const {language, value} = props;
    // console.log(props);
    return (
      <SyntaxHighlighter 
        style={ally_dark} 
        language={language} 
        children={value} />
    )
  },
  blockquote: (props) => {
    return <div children={props.children} style={{borderLeft: "5px solid gray", marginLeft: "1rem"}} />
  },
  tableCell: (props) => {
    // console.log(props);
    const style = {
      textAlign: props.align || 'center',
      padding: 5
    };

    if (props.isHeader) {
      style.borderTop = '3px solid black'
      style.borderBottom = '3px solid black'
    } else {
      style.borderBottom = '1px solid black'
    }

    return (
      <td style={style}>
        {props.children}
      </td>
    )
  }
}

function Post(props) {
  const post = props.post;
  const { topicId } = useParams();
  console.log(props);
  return (
    <div className="Post">
      <div className="Post-title">
        {topicId}
      </div>
      
      <ReactMarkdown
        className="Post-markdown"
        plugins={[gfm]}
        renderers={renderers}
      >
        {post.text || `Loading...`}
      </ReactMarkdown>
    </div>
  )
}

export default Post;
