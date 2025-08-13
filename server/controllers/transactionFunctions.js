



export const getTransType=(code)=>{
    if(code==='Purchase' || code==='Expense' || code==='Withdrawal'){
      return 'debit';
    } else if(code==='Sales'|| code==='Deposit'){
      return 'credit';
    }else {
      return ;
    }
  }
  
  
  export const getTransTypeTotal=(objArr)=>{  
    const gt = objArr.reduce((accumulator, currentObject) => {
      return accumulator + currentObject.amount;
    }, 0);        
    
    return gt;
  }
  
  export const getTransCodeTotal=(objArr)=>{
    let transCodeSumList=[];
    let unikTransCodeArr=getUniqueTransCodes(objArr);
    console.log("unikTransCodeArr : ", unikTransCodeArr);
  
    for(let i=0; i < unikTransCodeArr.length; i++){
        let transCodeTotal=0;
        for(let j=0; j < objArr.length; j++){
            if(unikTransCodeArr[i]===objArr[j].transCode){
              transCodeTotal+=objArr[j].amount;
            }
        }
        transCodeSumList.push({transCode:unikTransCodeArr[i], transCodeTotal:transCodeTotal});
    }       
    
    return transCodeSumList;
  }
  
function getUniqueTransCodes(arr){
    console.log(" array of objects to get unique codes : ", arr);
    let uniqueArr=[];
    for(let i=0; i<arr.length; i++){
        if (uniqueArr.indexOf(arr[i].transCode) === -1) {
            uniqueArr.push(arr[i].transCode);
          }      
    }
    return uniqueArr;
  }


  /*
  const data = [
  { name: 'Item A', value: 10, category: 'Electronics' },
  { name: 'Item B', value: 20, category: 'Books' },
  { name: 'Item C', value: 15, category: 'Electronics' },
  { name: 'Item D', value: 25, category: 'Books' },
];

// Filter for items in 'Electronics' category and sum their values
const totalElectronicsValue = data
  .filter(item => item.category === 'Electronics')
  .reduce((sum, item) => sum + item.value, 0);

console.log(totalElectronicsValue); // Output: 25 (10 + 15)
*/