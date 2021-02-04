import React, {useState, useEffect, useRef, useCallback} from 'react';

import useEventListener from './useEventListener';

import PostList from '../components/PostList';
import SideMenu from '../components/SideMenu';

// file import 
import fileListRaw from '../tools/fileList.txt'

// etc
import {Helper} from '../helper/Helper';

// css
import './Posts.css';

function useTest (initValue) {
  const [value, setValue] = useState(initValue);

  const ref = useRef(value);

  useEffect(() => {
    setValue(ref.current);
    console.log("value updated: ", value);
  }, [ref]);

  return [value, setValue, ref];
}

function Posts (props) {
  const {count} = props;

  // const loadPostsMdFiles = () => {
  //   const fetchFileList = (rawFile) => {
  //     return fetch(rawFile)
  //       .then(r => r.text());
  //   }

  //   const makeFileTitleList = (fileTitleTxt) => {
  //     return fileTitleTxt.split('\n').slice(0, -1);
  //   }

  //   const fetchPosts = (fileTitleList) => {
  //     const fileImportPromiseList = fileTitleList.map(fileTitle => {
  //       return import(`../_posts/${fileTitle}`);  // !fixme: path => constants
  //     });

  //     return Promise.all(fileImportPromiseList)
  //     .then(moduleList => 
  //       Promise.all(
  //         moduleList.map(module => 
  //           fetch(module.default)
  //           .then(raw => raw.text())
  //         )
  //       )
  //     )
  //   }

  //   const makePostInfoList = (postList) => {
  //     return postList.map(post => Helper.postContentsDivider(post));
  //   }

  //   fetchFileList(fileListRaw)
  //   .then(fileTitleTxt => makeFileTitleList(fileTitleTxt))
  //   .then(fileTitleList => fetchPosts(fileTitleList))
  //   .then(postList => makePostInfoList(postList))
  //   .then(posts => console.log(posts))
  //   .catch(console.log);
  //   // .then(postInfoList => makeCategoryList(postInfoList))
  // }

  // useEffect(() => {
  //   // console.log(fileListRaw);
  //   loadPostsMdFiles(fileListRaw)
  // }, []);  // mount

  

  ////////////////////////

  const [value, setValue, valueRef] = useTest({
    begin: 0,
    end: 0,
    curItem: 0,
    totalItem: 0
  });
  useEffect(() => {
    console.log("pageUpdated! Start file fetching...");
    console.log(value);
  }, [value]);

  const pageRef = useRef();
  pageRef.current = {
    begin: 0,
    end: 0,
    curItem: 0,
    totalItem: 0
  }

  const handleScroll = (e) => {
    const scrollTop = e.srcElement.scrollingElement.scrollTop;
    const scrollHeight = e.srcElement.scrollingElement.scrollHeight;
    const clientHeight = e.srcElement.scrollingElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
      // const copyPage = Object.assign({}, pageRef.current);
      // console.log(copyPage, pageRef);

      // copyPage.begin += 3;
      // copyPage.end += 3;
      // copyPage.curItem += 3;

      // console.log(copyPage);

      // pageRef.current = copyPage;  // set pageRef
      // setPage(pageRef.current);
      console.log(value, valueRef.current);

      valueRef.current.begin += count;
      valueRef.current.end += count;
      valueRef.current.curItem += count;

      console.log(value, valueRef.current);

      setValue(valueRef.current);
      console.log(value, valueRef.current);
    }
  }

  useEffect(() => {
    Helper.fetchFile(fileListRaw, fileTitles, setFileTitles);
  }, [])

  const [fileTitles, setFileTitles] = useState(null);
  useEffect(() => {
    console.log("categoryList: window event");
    console.log(fileTitles);
  }, [fileTitles]);  

  

  // const handler = useCallback(
  //   (event) => {
  //     const scrollTop = event.srcElement.scrollingElement.scrollTop;
  //     const scrollHeight = event.srcElement.scrollingElement.scrollHeight;
  //     const clientHeight = event.srcElement.scrollingElement.clientHeight;

  //     console.log();
  //     if (scrollTop + clientHeight >= scrollHeight) {
        
  //     }

  //   },
  //   [setPage]
  // )

  useEventListener("scroll", handleScroll );
  
  const [page, setPage] = useState({
    begin: 0,
    end: 0,
    curItem: 0,
    totalItem: 0
  });
  // fetch file


  return (
    <>
      <div 
        // onClick={e => {
        //   const ret = {}; 
        //   console.log(fileTitles); 
        //   ret.pageX = e.pageX; 
        //   // setFileTitles(ret);
        // }} 
        style={{ backgroundColor: "red", width: "100px", height: "200vh" }} />
      <div className="Posts">
        {/* <PostList postList={postList}/>
        <SideMenu categories={categoryList}/> */}
      </div>
      <div className="Post">
        Hidden
      </div>
    </>
  );
}

export default Posts;