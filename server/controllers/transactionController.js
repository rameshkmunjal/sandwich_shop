import TransactionModel from '../schema/transaction.js';
import BankModel from '../schema/bank.js';
import shortId from 'shortid';
import { 
          getTransType, 
          getTransTypeTotal, 
          getTransCodeTotal
        } from './transactionFunctions.js';

import {findMonthOfBuyDate, findFyOfBuyDate} from './purchaseFunctions.js';


export const createTransaction=async(req, res)=>{
    //console.log("createTransaction called", req.body);
    const {transDate, transCode, party, itemId, amount } = req.body;
    //console.log("payload inside req body :", typeof(transDate));
    const id=shortId.generate();
    const trList=await TransactionModel.find(); 
    
    const month=findMonthOfBuyDate(transDate);
    const fy=findFyOfBuyDate(transDate);
    const transId=setTransactionId(trList);
    let transType=getTransType(transCode);
    const i = await TransactionModel.create(
                              {
                                id, 
                                transId, 
                                transDate, 
                                month, 
                                fy,  
                                amount, 
                                party, 
                                itemId, 
                                transType, 
                                transCode
                              }
                            );    
    
    if (i) {  
        console.log(i);      
        res.status(201).json({
            id:i.id,
            transId:i.transId,
            transDate:i.transDate,
            month:i.month, 
            fy:i.fy,
            amount:i.amount,
            party:i.party,
            itemId:i.itemId,
            transType:i.transType,
            transCode:i.transCode
        })
    } else {
        res.status(400).json({message:"Invalid Transaction data"});
        throw new Error('Invalid transaction data')
    }
}


/* GET API to get transaction list */
export const getTransactionList=async(req, res)=>{
    const transactionList=await TransactionModel.find({'isAlive':true});
    const debitTransList = transactionList.filter(i => i.transType === 'debit');
    const creditTransList = transactionList.filter(i => i.transType === 'credit');
    const debitTransArr=getTransCodeTotal(debitTransList );    
    const creditTransArr=getTransCodeTotal(creditTransList );    
    const debitTransTotal=getTransTypeTotal(debitTransList);    
    const creditTransTotal=getTransTypeTotal(creditTransList);

    if(transactionList){
        res.json({
            debitTransArr:debitTransArr, 
            creditTransArr:creditTransArr,
            debitTransTotal:debitTransTotal,
            creditTransTotal:creditTransTotal, 
            transactionList:transactionList
          });
    } else {
        res.status(404);
        throw new Error('transactionList Not Found');
    }
}

export const getTransactionById = async (req, res) =>{    
  const transaction = await TransactionModel.findOne({ id: req.params.id });      
    if (transaction) {
      res.json(transaction)
    } else {
      res.status(404)
      throw new Error('transaction not found')
    }
}

/* DELETE API to remove a transaction */
export const deleteTransaction= async (req, res) => {
    const transaction = await TransactionModel.findOne({ id: req.params.id })
  
    if (transaction) { 
      transaction.isAlive=false;

      const updatedTransaction = await transaction.save();
      console.log(updatedTransaction);
      res.json(updatedTransaction);
  } else {
    res.status(404)
    throw new Error('Transaction not found')
  }
}


function setTransactionId(arr){
    let value=1;
    if(arr.length === 0){
        return value;
    } else {
        value=Number(arr[arr.length-1].transId)+1;
        return value;
    }
}




/* GET API to get transaction list */
export const getList=async(req, res)=>{
  const list=await BankModel.find();
 // console.log(list);
  if(list){
      res.json(list);
  } else {
      res.status(404);
      throw new Error('bank List Not Found');
  }
}

export const updateAccounts=async(req, res)=>{
  const {id}=req.body;
  console.log("id in updateAccounts : ", id);
  const transaction = await TransactionModel.findOne({ id:id });
  //res.json(transaction);
      if (transaction) { 
        transaction.posted=true;

        const updatedTransaction = await transaction.save();
        console.log(updatedTransaction);
        res.json(updatedTransaction);
    } else {
      res.status(404)
      throw new Error('Transaction not found')
    }
}




/*
function mergeObjects(arr1, arr2, key) {
  const mergedArray = [];
  const map = new Map();

  // Create a map from arr2 for faster lookups
  for (const obj of arr2) {
    map.set(obj[key], obj);
  }

  for (const obj1 of arr1) {
    const keyVal = obj1[key];
    const obj2 = map.get(keyVal);

    if (obj2) {
      // If a match is found, merge the properties
      mergedArray.push({ ...obj1, ...obj2 });
    } else {
      // If no match, include the original object
      mergedArray.push(obj1);
    }
  }
  return mergedArray;
}

// Example Usage:
const array1 = [
  { id: 1, name: 'John', age: 30 },
  { id: 2, name: 'Jane', age: 25 },
  { id: 3, name: 'Mike', age: 40 },
];

const array2 = [
  { id: 2, city: 'New York' },
  { id: 1, city: 'London' },
];

const merged = mergeObjects(array1, array2, 'id');
console.log(merged);
// Expected Output:
// [
//   { id: 1, name: 'John', age: 30, city: 'London' },
//   { id: 2, name: 'Jane', age: 25, city: 'New York' },
//   { id: 3, name: 'Mike', age: 40 }
// 
*/

/*
function getUniqueTransTypes(arr){
  console.log(" array of objects to get unique categories : ", arr);
  let uniqueArr=[];
  for(let i=0; i<arr.length; i++){
      if (uniqueArr.indexOf(arr[i].transType) === -1) {
          uniqueArr.push(arr[i].transType);
        }      
  }
  return uniqueArr;
}
*/