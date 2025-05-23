import { itemCatArr } from '../JsonData/data.js';

export const getItem=(itemName)=>{
    console.log("insided getItem : itemName : ", itemName);
    console.log("insided getItem : itemCatArr : ", itemCatArr);
    const item = itemCatArr.find(item => item.name === itemName);
    return item;
    
}

export const make5LettersStr=(str)=>{
    if(str.length === 1){
        return '0000'+str;
    }
    else if (str.length === 2){
        return '000'+str;
    } else if(str.length === 3){
        return '00'+str;
    } else if(str.length === 4){
        return '0'+str;
    }else if(str === "loose"){
        return '99999';
    }
     else {
        return str;
    }
}

export const sortList=(arr)=> {    
    arr.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
    return arr;
  }