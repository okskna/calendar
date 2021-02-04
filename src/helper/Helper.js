export const Helper = {
  fetchFile: (rawFile, text, setText) => {
    if (!text) {
      fetch(rawFile)
      .then(r => r.text())
      .then(text => {
        setText(text);
        // console.log(text);
      });
    }
  },

  deepcopy: (arr) => {
    let copy = [];
    arr.forEach(item => {
      if (Array.isArray(item)) {
        copy.push(Helper.deepcopy(item));
      } else if (item.constructor == Object) {
        copy.push(Helper.deepcopyObject(item));
      } else {
        copy.push(item);
      }
    })
  
    return copy;
  },

  deepcopyObject: (obj) => {
    let copy = {};
    Object.entries(obj).forEach(item => {
      const [key, value] = item;
      // console.log("item: ", key, value);
      if (value.constructor == Object) {
        copy[key] = Helper.deepcopyObject(value);
      } else if (Array.isArray(value)) {
        copy[key] = Helper.deepcopy(value);
      } else {
        copy[key] = value;
      }
    })
  
    return copy;
  },

  postTitleDivider: (rawTitle) => {
    const title = {};
    title.date = rawTitle.slice(0, 10);
    title.title = rawTitle.slice(11);

    return title;
  },

  getSlashRegexIdx: (rawContents) => {
    let slashRegex = /(---)/g;
    let temp;
    let regexIdxList = [];
    while((temp = slashRegex.exec(rawContents)) !== null) {
      regexIdxList.push(slashRegex.lastIndex);
    };

    return regexIdxList;
  },

  divideInfoFromContents: (rawContents, regexIdxList) => {
    let infoList = rawContents.slice(regexIdxList[0], regexIdxList[1] - 3).split('\n');
    infoList = infoList.filter( (_, idx) => idx !== 0 && idx !== infoList.length - 1);

    return infoList;
  },

  postContentsDivider: (rawContents) => {
    const contents = {};

    const regexIdxList = Helper.getSlashRegexIdx(rawContents);
    const infoList = Helper.divideInfoFromContents(rawContents, regexIdxList);

    infoList.forEach(info => {
      let key, value;
      
      key = info.slice(0, info.indexOf(':'));
      value = info.slice(info.indexOf(':') + 1);

      if (value[0] === " ") 
        value = value.slice(1);

      contents[key] = value;
    });
    
    contents.text = rawContents.slice(regexIdxList[1]);

    
    // console.log("postContentsDivider: return contents: ", contents);
    return contents;
  } 
}


// const test = [
//   "a", 
//   { 
//     "key1": [
//       "arrValue1",
//       "arrValue2"
//       ], 
//     "key2": { 
//       "key2-1": "key2-1 value", 
//       "key2-2": ["end"]
//     }
//   }, 
//   [
//     "arrValue1", 
//     "arrValue2", 
//     [
//       "arrArrValue1", 
//       { 
//         "arrArrObjKey1": [
//           "arrArrObjArrValue"
//         ] 
//       }
//     ]
//   ]
// ];

// Helper.deepcopy(test);