import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';

import './Home.css';

import {constants} from '../constants/constants'


function Home () {  
  return (
    <>
      <div className="home">
        {
        constants ? 
        <a className="home-github-commit-graph" href={`https://github.com/${constants.username}`} >
          <GitHubCalendar username={constants.username} blockSize={10} blockMargin={4} fontSize={12} >
            <ReactTooltip delayShow={50} html />
          </GitHubCalendar>
        </a> : 
        `LALALA`
        }
        
        <div className="home-latest-posts">
          <span className="home-latest-posts-title">Latest Posts</span>
          <div className="home-latest-posts-item">
            <li style={{listStyle: "none"}}>
              <ul style={{padding: 0}}>
                <div style={{border: "1px solid black", width: "100%"}}>
                  item box
                </div>
              </ul>
            </li>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;