import React, {useState, useEffect} from 'react';

import useEventListener from './useEventListener';

import PostList from '../components/PostList';
import SideMenu from '../components/SideMenu';

// file import 
import fileListRaw from '../tools/fileList.txt'

// etc
import {Helper} from '../helper/Helper';

// css
import './Posts.css';

function Posts (props) {
  const {count} = props;

  useEventListener('scroll', (event) => {
    const scrollTop = event.srcElement.scrollingElement.scrollTop;
    const clientHeight = event.srcElement.scrollingElement.clientHeight;
    const scrollHeight = event.srcElement.scrollingElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      console.log("Bottom!");
      setIsBottom(true);
    }
  });
  
  const getFileTitleList = (fileListRaw) => {
    const fetchFileList = (rawFile) => {
      return fetch(rawFile)
        .then(r => r.text());
    }

    const makeFileTitleList = (fileTitleTxt) => {
      return fileTitleTxt.split('\n').slice(0, -1);
    }

    fetchFileList(fileListRaw)
    .then(fileTitleTxt => {
      // console.log("fileTitleTxt: ", fileTitleTxt);
      return makeFileTitleList(fileTitleTxt)
    })
    .then(fileTitleList => {
      // console.log("fileTitleList: ", fileTitleList);
      setFileTitleList(fileTitleList);
    })
  }

  const fetchPosts = (fileTitleList) => {
    const fileImportPromiseList = fileTitleList.map(fileTitle => {
      return import(`../_posts/${fileTitle}`);  // !fixme: path => constants
    });

    return Promise.all(fileImportPromiseList)
    .then(moduleList => 
      Promise.all(
        moduleList.map(module => 
          fetch(module.default)
          .then(raw => raw.text())
        )
      )
    )
  }

  const makePostInfoList = (postList) => {
    return postList.map(post => Helper.postContentsDivider(post));
  }

  const [postTitleList, setFileTitleList] = useState([]);
  useEffect(() => {
    console.log("1. mount");
    if (fileListRaw)
      getFileTitleList(fileListRaw);
    else
      console.log("Posts mount: fileListRaw is not define. ");
  }, []);  // mount

  const [page, setPage] = useState({
      begin: 0,
      end: 0,
      curItems: 0,
      totalItems: 0
    });
  useEffect(() => {
    console.log("2. postTitleList updated.: ", postTitleList);
    const pageFormat = {
      begin: 0,
      end: count,
      curItems: count,
      totalItems: postTitleList.length
    }
    if (postTitleList.length < count) {
      pageFormat.end = postTitleList.length;
      pageFormat.curItems = postTitleList.length;
    }
    setPage(pageFormat);
  }, [postTitleList]);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("3. page updated.: ", page);

    const fetchList = postTitleList.slice(page.begin, page.end);
    
    fetchPosts(fetchList)
    .then(postList => {
      // console.log("postList: ", postList);
      return makePostInfoList(postList)
    })
    .then(newPosts => {
      const postCopy = Helper.deepcopy(posts);
      // console.log("newPosts: ", newPosts);
      const ret = postCopy.concat(newPosts);
      // console.log("newPosts + postCopy: ", ret);
      setPosts(ret);
    })

  }, [page]);

  useEffect(() => {
    console.log("4. posts updated.: ", posts);
  }, [posts])

  const addItem = () => {
    console.log("addItem: ");
    const pageCopy = Object.assign({}, page);
    if (pageCopy.totalItems === pageCopy.end) {
      // Do noting
      console.log("All pages are uploaded.");
      return;
    } else if (pageCopy.end + count > pageCopy.totalItems) {
      pageCopy.begin += count;
      pageCopy.end = pageCopy.totalItems;
      pageCopy.curItems = pageCopy.totalItems;
    } else {
      pageCopy.begin += count;
      pageCopy.end += count;
      pageCopy.curItems += count;
    }

    setPage(pageCopy);
  };

  const [isBottom, setIsBottom] = useState(false);
  useEffect(() => {
    console.log("isBottom updated: ", isBottom);
    if (isBottom) {
      addItem();
      setIsBottom(false);
    }
  }, [isBottom]);

  return (
    <>
      <div className="Posts">
        <PostList postList={posts}/>
        {/* <SideMenu categories={categoryList}/> */}
      </div>
      <div className="Post">
        Hidden
      </div>
    </>
  );
}

export default Posts;