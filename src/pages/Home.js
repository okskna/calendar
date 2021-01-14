import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import ReactTooltip from 'react-tooltip';
import GithubCommitGraphTestImg from '../img/github-commit-graph.JPG';
import './Home.css';


function Home () {  
  return (
    <>
      <div className="home">
        <div className="home-github-commit-graph">
          <GitHubCalendar username="okskna" blockSize={10} blockMargin={4} fontSize={12} >
            <ReactTooltip delayShow={50} html />
          </GitHubCalendar>
        </div>
        <div className="home-latest-posts">
          <span className="home-latest-posts-title">Latest Posts</span>
          <div className="home-latest-posts-item">
            items
          </div>
        </div>
      </div>
      hi
    </>
  );
}

export default Home;