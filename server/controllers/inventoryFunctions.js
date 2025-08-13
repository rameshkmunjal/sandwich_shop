import { itemCatArr} from '../JsonData/data.js';


export const  getNewArr=(arr)=>{
    for(let i=0; i < arr.length; i++){
        let sum=0;
        let countArr=arr[i].stockReleased;
        if(countArr.length === 0){
            sum=0;
        } else {
            for(let j=0; j < countArr.length; j++)sum=sum+countArr[j]; 
        }

        arr[i].releaseCount=sum;
        //console.log("obj with releaseCount property", arr[i]);
    }
    return arr;
}


export const  getUniqueItems=(arr)=>{
    let a=[];

    for(let i=0; i < arr.length; i++){
        let itemCode=arr[i].itemId.substring(0, 3);
        if (a.indexOf(itemCode) === -1) {
                a.push(itemCode);
          } 
    }   

    return a;
}

export const getItemTotal=(unikArr, objArr)=>{
    console.log("inside getItemTotal : array of objects : ", objArr);
    let invSumArr=[];
   // console.log("line 297 : ", objArr);
    for(let k=0; k < unikArr.length; k++){
        let itemQtySum=0;
        let itemPriceSum=0;
        let itemObj={};
        for(let i=0; i < objArr.length; i++){
            let str=objArr[i].itemId.substring(0, 3);
            //console.log("line 303 : " , str);
            
            if(unikArr[k]===str){
                //console.log("line 309 : ", i  , " : matched");
                itemPriceSum=itemPriceSum+Number(objArr[i].amount);
                console.log("itemPriceSum : ", unikArr[k], ":" , itemPriceSum);
                itemQtySum=itemQtySum+Number(objArr[i].qty); 
                //console.log(itemQtySum);               
            }
        }
        itemObj.amount=itemPriceSum;
        itemObj.qty=itemQtySum;
        itemObj.code=unikArr[k];
        //console.log("line no. 320  : ", itemObj);
        const obj = itemCatArr.find(({code }) => code === itemObj.code);

        itemObj.item=obj.name;

        //if(itemObj.qty > 0){
            invSumArr.push(itemObj);
       // }
        
    }
    return invSumArr;
}


export const capitalizeFirstLetterAndAssign=(name)=>{
    const words = name.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i];
    }

    const objName=words.join(" ");
    return objName;
}

export const getCategories=(itemArr, objArr)=>{

    for(let i=0; i< objArr.length; i++){
        let catCode=objArr[i].itemId.substring(0, 3);
        console.log("it is catCode: ", catCode);
        let category=findCategory(itemArr, catCode);
        console.log("it is category: ",category);
        objArr[i].cat=category;
    }
console.log(objArr);
    return objArr;
    
}


export const getCategorySummary=(objArr)=>{
    let catSumList=[];
    let unikCatArr=getUniqueCategories(objArr);
    console.log("unikCatArr : ", unikCatArr);

    for(let i=0; i < unikCatArr.length; i++){
        let categoryTotal=0;
        let qtyTotal=0;
        for(let j=0; j < objArr.length; j++){
            if(unikCatArr[i]===objArr[j].category){
                categoryTotal+=objArr[j].currentValue;
                qtyTotal+=objArr[j].currentQty;
            }
        }
        catSumList.push({category:unikCatArr[i], qtyTotal:qtyTotal, categoryTotal:categoryTotal});
    }       
    
    return catSumList;
}




///wrong wrong wrong what is use of ua
/*
export const getUniqueCatCodes=(ua, ia)=>{
    let arr=[];
    for(let i=0; i < ua.length; i++){           
        const obj = ia.find(({category}) => category === ua[i]);
        arr.push(obj.code[0]);
    }
    return arr;
}
/*
for(let i=0; i < arr.length; i++){
        a.push(arr[i].category);
    }
    // Initialize epmty array to store unique values
    let a1 = [];

    // Iterate over the array to get unique values
    for (let i = 0; i < a.length; i++) {
        
        // Check if the element exist in the new array
    
        if (!a1.includes(a[i])) {
        
            // If not then push the element to new array
            a1.push(a[i]);
        }
    }

    return a1;

    */

export const arrangeReleaseItemsAndDates=(arr1, arr2)=>{
        let newArr=[];
        for(let i=0; i < arr1.length; i++ ){
            let obj={qty:arr1[i], date:arr2[i] };
            newArr.push(obj);
        }
        return newArr;
}


function findCategory(arr, code){    
    for(let i=0; i<arr.length; i++){
        if(arr[i].code===code){
            return arr[i].category;  
        }
    }
}

function getUniqueCategories(arr){
    console.log(" array of objects to get unique categories : ", arr);
    let uniqueArr=[];
    for(let i=0; i<arr.length; i++){
        if (uniqueArr.indexOf(arr[i].category) === -1) {
            uniqueArr.push(arr[i].category);
          }      
    }
    return uniqueArr;
}

// Newly Added Functions

export const getGroupTotal=(objArr)=>{  
    const gt = objArr.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.currentValue;
    }, 0);        
    
    return gt;
  }
  
  export const getCategoryTotal=(objArr)=>{  
    const gt = objArr.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.categoryTotal;
    }, 0);        
    
    return gt;
  }

  export const addStatusToInventoryList=(arr)=>{
    for (let i = 0; i < arr.length; i++) {
      const { currentQty, cql } = arr[i];
      //console.log("current Quantity : ", typeof(currentQty));
  
      if (Number(currentQty) >= Number(cql)) {
        arr[i].status = 'adequate';
      } else if (Number(currentQty) > 0) {
        arr[i].status = 'low';
      } else {
        arr[i].status = 'out';
      }
      //console.log("arr index : ", arr[i].status);
    }
    return arr;
  }
  
export const getReleaseMasterData=(arr)=>{
    //console.log('arr : ', arr[0]);
    let newArr=[];
    for(let i=0; i < arr.length; i++){
      let releaseArr=arr[i].releases;
      for(let j=0; j < releaseArr.length; j++){
          let obj={};
          obj.category=arr[i].category;
          obj.day=releaseArr[j].date.getDate();
          obj.month=releaseArr[j].date.toLocaleString('default', { month: 'long' });
          //date.toLocaleString('default', { month: 'long' }); 
          obj.year=releaseArr[j].date.getFullYear();
          obj.date=formatDate(releaseArr[j].date);
          obj.itemId=arr[i].itemId;
          obj.itemName=arr[i].itemName;
          obj.unitPrice=arr[i].unitPrice;
          obj.quantity=releaseArr[j].quantity;
          obj.amount=releaseArr[j].amount;
          obj.releaseId=releaseArr[j].releaseId;
          
          newArr.push(obj);
      }    
    }
    return newArr;
  }

  function formatDate(d){
    let day=d.getDate();
    let month=d.getMonth()+1;
    let year=d.getFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
  
  
export const sortListOnDay=(arr)=>{    
    arr.sort((a, b) => {
      if (a.day < b.day) {
        return -1;
      }
      if (a.day > b.day) {
        return 1;
      }
      return 0;
    });
    return arr;
  }


export const getFilteredData=(md, m, y)=>{
    //console.log(md);
    let arr1=md.filter(i => i.month === m);
    let arr2=arr1.filter(i => i.year === Number(y));
    console.log(arr2);
    
    
    return arr2;
  
  }
  
  
  
  export const getReleaseItemsAmountTotal=(objArr)=>{  
    const gt = objArr.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.amount;
    }, 0);        
    
    return gt;
  }
  
  
export const summarizeItemCodes=(arr)=> {
    const summary = {};
    let grandTotal = 0;
  
    arr.forEach(item => {
      const { itemId, itemName, amount } = item;
  
      if (!summary[itemId]) {
        summary[itemId] = {
          totalAmount: 0,
          itemName: itemName
        };
      }
  
      summary[itemId].totalAmount += amount;
      grandTotal += amount;
    });
  
    const formattedSummary = Object.keys(summary).map(itemId => ({
      itemId: parseInt(itemId),
      itemName: summary[itemId].itemName,
      totalAmount: summary[itemId].totalAmount
    }));
  
    return {
      summary: formattedSummary,
      grandTotal: grandTotal
    };
  }
  