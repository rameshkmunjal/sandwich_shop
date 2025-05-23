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


export const getCategoryTotal=(objArr)=>{
    let catSumList=[];
    let unikCatArr=getUniqueCategories(objArr);
    console.log("unikCatArr : ", unikCatArr);

    for(let i=0; i < unikCatArr.length; i++){
        let categoryTotal=0;
        let qtyTotal=0;
        for(let j=0; j < objArr.length; j++){
            if(unikCatArr[i]===objArr[j].cat){
                categoryTotal+=objArr[j].amount;
                qtyTotal+=objArr[j].qty;
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
        if (uniqueArr.indexOf(arr[i].cat) === -1) {
            uniqueArr.push(arr[i].cat);
          }      
    }
    return uniqueArr;
}