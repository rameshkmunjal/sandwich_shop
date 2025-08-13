import shortId from 'shortid';
import ItemModel from '../schema/item.js';
import TransactionModel from '../schema/transaction.js';
import InventoryModel from '../schema/inventory.js';
import PurchaseModel from '../schema/purchase.js';
import {sortList} from './itemFunctions.js';


export const createPurchase=async(req, res)=>{
    const {transId, qty } = req.body;
    const transaction=await TransactionModel.findOne({'transId':transId});
    console.log("transaction : " , transaction);
    const {itemId, amount}=transaction;
    console.log("itemId : ", itemId);
    const item = await ItemModel.findOne({itemId:itemId });
    const inventory=await InventoryModel.findOne({itemId:itemId});

    let itemName=undefined;
    let category=undefined;
    let currentQty=undefined;
    let currentValue=undefined;
    let additionArr=null;
    let updatedTransaction={};

    if(item){
        itemName=item.itemName;
        category=item.category;
    } else {
        res.status(400);
        throw new error('item not found');
    }

    if(inventory){
        currentQty=inventory.currentQty+Number(qty);
        currentValue=inventory.currentValue+Number(amount);
        additionArr=inventory.addition;

    }else{
        currentQty=Number(qty);
        currentValue=Number(amount);
    }
    
    if(transaction){
        transaction.posted=true;
        updatedTransaction = await transaction.save();
    } else {
        res.status(404)
        throw new Error('transaction not found')
    }


    const id=shortId.generate();   
    
    const i = await InventoryModel.create({
        id:id,      
        itemId:itemId,
        itemName:itemName, 
        currentQty:currentQty,       
        currentValue:currentValue,
        addition:{qty:currentQty, amount:currentValue}  
    }) 
// transId:transId, 
    if (i) {        
        console.log(i);
        
        res.status(201).json({
            id:i.id,
            transId:i.transId,
            itemId:i.itemId,
            itemName:i.itemName,
            category:i.category,
            quantity:i.currentQty,
            currentValue:i.currentValue
        })
    } else {
        res.status(400).json({message:"Invalid purchase data"});
        throw new Error('Invalid purchase data')
    }
        
    
}

export const getMonthlyPurchaseList=async(req, res)=>{
    const list=await PurchaseModel.find({'month':req.params.month});

    if(list){
        res.json(sortList(list));
    } else {
        res.status(404);
        throw new Error('purchaseList Not Found');
    }

}



const mergeArraysByKey = (arr1, arr2) => {
    //console.log("arr2 : ", arr2);
    let tempArr= [];
  
    for(let i=0; i < arr1.length; i++){
        const tl=arr1[i];
        for(let j=0; j<arr2.length; j++){
            const pl=arr2[j];
            if(Number(tl.transId)===pl.transId){
                let tempObj={};
                //console.log("key matched");
                tempObj.transId=tl.transId;
                tempObj.transDate=tl.transDate,
                tempObj.fy=tl.fy,
                tempObj.party=tl.party,
                tempObj.amount=tl.amount,
                tempObj.category=pl.category,
                tempObj.itemName=pl.itemName,
                tempObj.qty=pl.qty,
                tempObj.id=pl.id
                //console.log(tempObj);
                tempArr.push(tempObj);
            }
            
        }
    }
    return tempArr;
  };
  

  export const getPurchasesList=async(req, res)=>{
    const purchaseList=await PurchaseModel.find();
    console.log('purchaseList : ', purchaseList);
    const transactionList=await TransactionModel.find({'isAlive':true});
    console.log('transactionList : ', transactionList);

    const list=mergeArraysByKey(transactionList, purchaseList);
    //console.log("here is merges list of purchase transactions", list);

    if(list){
        res.json(sortList(list));
    } else {
        res.status(404);
        throw new Error('purchaseList Not Found');
    }
}

export const deletePurchase= async (req, res) => {
    console.log("req params id in delete purchase : ", req.params.id);
    const purchase = await PurchaseModel.findOne({ id: req.params.id }); 
    console.log(purchase );
    if (purchase) {
      await purchase.deleteOne();
      res.json({ message: 'clicked purchase record deleted' })
    } else {
      res.status(404)
      throw new Error('purchase  record not found')
    }
}

  // Find a user by their ID
//const userById = users.find(user => user.id === 2);
//console.log(userById); // Output: { id: 2, name: 'Bob', age: 24 }

// Find a user by their name
//const userByName = users.find(user => user.name === 'Alice');
//console.log(userByName); // Output: { id: 1, name: 'Alice', age: 30 }


/*
import mongoose from 'mongoose';
import InventoryModel from './models/inventory.js'; // adjust path accordingly

await mongoose.connect('mongodb://localhost:27017/burger-cafe');

const createInventory = async () => {
  const inventoryItem = new InventoryModel({
    id: 'INV001',
    itemId: 'ITEM001',
    itemName: 'Burger Bun',
    currentQty: 100,
    currentValue: 500,
    addition: [
      {
        transId: 'T1001',
        quantity: 100,
        amount: 500
      }
    ],
    releases: [] // empty initially
  });

  try {
    const result = await inventoryItem.save();
    console.log('New Inventory Saved:', result);
  } catch (err) {
    console.error('Error:', err.message);
  }
};

createInventory();


const addStock = async (recordId) => {
  const additionEntry = {
    transId: 'T1002',
    quantity: 50,
    amount: 250
  };

  try {
    const updated = await InventoryModel.findOneAndUpdate(
      { id: recordId },
      {
        $push: { addition: additionEntry },
        $inc: {
          currentQty: additionEntry.quantity,
          currentValue: additionEntry.amount
        }
      },
      { new: true }
    );

    console.log('Stock Added:', updated);
  } catch (err) {
    console.error('Error adding stock:', err.message);
  }
};

addStock('INV001');



const releaseStock = async (recordId) => {
  const releaseEntry = {
    quantity: 20,
    amount: 100,
    releasedTo: 'Kitchen',
    releasedBy: 'Manager A'
  };

  try {
    const updated = await InventoryModel.findOneAndUpdate(
      { id: recordId },
      {
        $push: { releases: releaseEntry },
        $inc: {
          currentQty: -releaseEntry.quantity,
          currentValue: -releaseEntry.amount
        }
      },
      { new: true }
    );

    console.log('Stock Released:', updated);
  } catch (err) {
    console.error('Error releasing stock:', err.message);
  }
};

releaseStock('INV001');

Notes:
id (your custom ID) is used to find the document.

currentQty and currentValue are updated using $inc.

If you're using import syntax, ensure "type": "module" in package.json.




*/