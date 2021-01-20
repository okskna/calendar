import React, {useState, useEffect} from 'react';

import PostList from '../components/PostList';
import SideMenu from '../components/SideMenu';

import './Posts.css';

function Posts (props) {
  const posts = props.posts;

  // const titles = posts.

  useEffect(() => {

  }, [props]);

  return (
    <>
      <div className="Posts">
        <PostList posts={posts}/>
        {/* <SideMenu titles={}/> */}
      </div>
    </>
  );
}

export default Posts;