import React, {useState, useEffect, useRef} from 'react';

import PostList from '../components/PostList';
import SideMenu from '../components/SideMenu';

// file import 
import fileListRaw from '../tools/fileList.txt'

// etc
import {Helper} from '../helper/Helper';

// css
import './Posts.css';

// custom hook: add event
import useEventListener from './useEventListener';

function Posts (props) {
  const {count} = props;
  const pageRef = useRef();
  pageRef.current = {
    begin: 0,
    end: count,
    curItems: count,
    totalItems: 0
  }

  const loadPostsMdFiles = (fileList) => {
    console.log("loadPostMdFiles");
    // return;
    if (!!fileList) {
      const fileImportPromiseList = fileList.map(file => {
        return import(`../_posts/${file}`);
      });

      let fileImportPromiseListAll = Promise.all(fileImportPromiseList);
      fileImportPromiseListAll
      .then(moduleList => {
        // console.log("2. moduleList: ", moduleList);
        return Promise.all(moduleList.map(module => {
          return fetch(module.default)
          .then(raw => raw.text())
        }))
      })
      .then(textList => {
        // console.log("4. textList: ", textList);
        // let postsCopy = Helper.deepcopy(posts);
        let postsCopy = Object.assign({}, posts);
        textList.forEach((text, idx) => {
          // postsCopy.title = fileArray[idx];
          // postsCopy.contents = text;
          postsCopy[fileList[idx]] = text;
        })
        // console.log("5. posts ", postsCopy);
        setPosts(postsCopy);
      })
      .catch(err => console.log("err: ", err));
    }
  }

  const setPageHere = () => {
    const copyPage = Object.assign({}, pageRef.current);
    console.log(pageRef.current);
    copyPage.begin += count;
    copyPage.end += count;
    copyPage.curItems += count;
    console.log("setPageHere:", copyPage);
    setPage(copyPage);
  }

  const handleScroll = (e) => {  
    const scrollTop = e.srcElement.scrollingElement.scrollTop;
    const scrollHeight = e.srcElement.scrollingElement.scrollHeight;
    const clientHeight = e.srcElement.scrollingElement.clientHeight;
    
    // console.log(page);
    // console.log(scrollTop, scrollHeight, clientHeight);
    console.log("handleScroll 1. scrollTop + clientHeight >= scrollHeight: ", scrollTop, clientHeight, scrollHeight, scrollTop + clientHeight >= scrollHeight);
    console.log("handleScroll 2. page.curItems < page.totalItems: ", page.curItems, page.totalItems, page.curItems < page.totalItems);
    if (scrollTop + clientHeight >= scrollHeight) {
      if (page.curItems < page.totalItems) {
        setPageHere();
        
        // console.log(page);

      }
    }
  }

  useEventListener("scroll", handleScroll );

  const [fileTitles, setFileTitles] = useState(null);
  useEffect(() => {
    Helper.fetchFile(fileListRaw, fileTitles, setFileTitles);
  }, []);

  const [page, setPage] = useState({
    begin: 0,
    end: count,
    curItems: count,
    totalItems: 0
  });
  useEffect(() => {
    console.log("fileTitles: setPage");
    if (!!fileTitles) {
      const fileList = fileTitles.split('\n').slice(0, -1);
      pageRef.current.totalItems = fileList.length;
      // const copyPage = Object.assign({}, pageRef.current);
      // copyPage.totalItems = fileList.length;
      // console.log(copyPage);
      // pageRef.current = copyPage;
      setPage(pageRef.current); 
    }
  }, [fileTitles]);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    console.log("page: setPosts", page);
    if (!!fileTitles) {
      const fileList = fileTitles.split('\n').slice(0, -1);
      // console.log(page);
      // console.log(fileList, page.begin, page.end, fileList.slice(page.begin, page.end));
      loadPostsMdFiles(fileList.slice(page.begin, page.end));
    } 
  }, [page]);
  
  ////////////////////////////////////////

  const [postList, setPostList] = useState([]);
  useEffect(() => {
    console.log("posts: setPostList");
    const copy = Helper.deepcopy(postList);

    Object.entries(posts).slice(page.begin).forEach(post => {
      const [rawTitle, rawContents] = post;
      const contents = Helper.postContentsDivider(rawContents);

      // console.log("contents: ", contents);
      copy.push(contents);
    });
    setPostList(copy);
  }, [posts]);

  
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    console.log("PostList: setCategoryList");
    const ret = postList.map(post => {
      // 콤마(,) 로 split 하여 category list 생성
      // 만약 콤마(,) 후 공백이 있을 경우 공백 제거
      return post.categories.split(',').reduce((pre, category) => {
        if (category[0] === ' ')
          category = category.slice(1);
        pre.push(category);
        return pre;
      }, []);
    });

    // console.log("ret: ", ret);
    setCategoryList(ret);
  }, [postList])

  return (
    <>
      <div className="Posts">
        <PostList postList={postList}/>
        <SideMenu categories={categoryList}/>
      </div>
      <div className="Post">
        Hidden
      </div>
    </>
  );
}

export default Posts;