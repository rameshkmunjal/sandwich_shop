import shortId from 'shortid';

import InventoryModel from '../schema/inventory.js';
import PurchaseModel from '../schema/purchase.js';

import {
    getCategories,
    getCategoryTotal,
    getItemTotal,
    getUniqueItems,
    getNewArr,
    arrangeReleaseItemsAndDates
} from './inventoryFunctions.js';
import {sortList} from './itemFunctions.js';

import { itemCatArr} from '../JsonData/data.js';


export const createInventory=async(req, res)=>{
    //console.log("createInventory called");
    //console.log("payload inside req body :", req.body.itemId);
    const item = await PurchaseModel.findOne({'id':req.body.itemId }); 
   // console.log('item inside createInventory', item)
    
    const {itemId, itemName, cat, qty, amount }=item;
    const id=shortId.generate();
    const remainingStock=0;
    const i = await InventoryModel.create({
        id,         
        itemId,         
        itemName, 
        cat,        
        qty,
        amount,
        remainingStock      
    })
    //itemName, cat, unit to be derived from itemModel
    //console.log("OBJECT CREATED OUT OF PAYLOAD" , i);

    if (i) {
        //console.log(i);
        res.status(201).json({
        id: i.id,
        itemId:i.itemId, 
        cat:i.cat,
        itemName:i.itemName, 
        qty:i.qty,
        amount:i.amount,
        remainingStock:i.remainingStock
        })
    } else {
        res.status(400).json({message:"Inventory creation data problem happened"});
        throw new Error('Invalid inventory data')
    }
}


/* DELETE API related functions */
export const deleteInventory= async (req, res) => {
    const inventory = await InventoryModel.findOne({ id: req.params.id })
  
    if (inventory) {
      await inventory.deleteOne()
      res.json({ message: 'clicked inventory record deleted' })
    } else {
      res.status(404)
      throw new Error('inventory not found')
    }
}


/*
function changeDateFormat(d){
    console.log("changeDateFormat function called");
    let arr=d.split("/");
    let newArr=[];
    newArr[0]=arr[2];
    newArr[1]=arr[1];
    newArr[2]=arr[0];
    let newDate=newArr.join('/');
    console.log("date in changed format - string",newDate);
    return newDate;
}
    */
export const getInventoryList=async(req, res)=>{
    const inventoryList=await InventoryModel.find();
    //console.log(inventoryList);
    
    let newArr=getNewArr(inventoryList);
    //console.log(newArr);
    if(newArr){
        res.json(sortList(newArr));
    } else {
        res.status(404);
        throw new Error('inventoryList Not Found');
    }
}

export const getInventoryItemSummary=async(req, res)=>{
    console.log("req params : " , req.params);
    
    const list=await InventoryModel.find({'category':req.params.category});
    console.log(list);
    if(list){
            res.json(list);
    } else {
            res.status(404);
            throw new Error('inventoryList Not Found');
    }           
}


export const getInventoryCategorySummary=async(req, res)=>{
    const list=await InventoryModel.find();
    //console.log(list);

    const newList=getCategories(itemCatArr, list);
    //console.log("line 191 : ", newList);
    
    let newArr=getCategoryTotal(newList);
    console.log("line 194 :", newArr);
    if(newArr){
        res.json(newArr);
    } else {
        res.status(404);
        throw new Error('inventoryList Not Found');
    }
}

export const getInventoryById = async (req, res) =>{    
    const inventory = await InventoryModel.findOne({ id: req.params.id });      
      if (inventory) {
        res.json(inventory)
      } else {
        res.status(404)
        throw new Error('Item not found')
      }
  }

  // @desc    Edit an item
// @route   PUT /item/:itemId
// @access  
export const editInventory = async (req, res) => {
    console.log("payload editInventory axios call", req.body);
    const {  
        id,      
        itemId, 
        itemName, 
        cat,        
        qty,
        amount , 
        remainingStock,
        releaseCount,
        relDate 
    } = req.body
  
    const i = await InventoryModel.findOne({'id':id});
    let str1=i.stockReleased.length > 0 ? i.stockReleased+'-'+releaseCount : releaseCount;
    let str2=i.rlDates.length > 0 ? i.rlDates+'-'+relDate : relDate;
  
  console.log(i);
    if (i) { 
        i.itemId=itemId, 
        i.itemName=itemName, 
        i.cat=cat,        
        i.qty=qty,
        i.amount=amount, 
        i.remainingStock=Number(remainingStock)-Number(releaseCount),
        i.stockReleased=str1;
        i.rlDates=str2;   
  
        const updatedInventory = await i.save();
        console.log("updatedInventory....", updatedInventory);
        res.json(updatedInventory);
    } else {
      res.status(404)
      throw new Error('record not found')
    }
  }


export const getItemReleaseDetails=async(req, res)=>{
    console.log(req.params);    
    const i = await InventoryModel.findOne({'id':req.params.id});
    console.log(i);
    if (i) { 
        let stockReleasedArr=i.stockReleased.split('-');
        let releaseDatesArr=i.rlDates.split('-');
        console.log(stockReleasedArr, releaseDatesArr);
        let arr=arrangeReleaseItemsAndDates(stockReleasedArr, releaseDatesArr);

        res.json({itemId:i.itemId, itemName:i.itemName, remainingStock:i.remainingStock, releaseArr:arr});
    } else {
      res.status(404)
      throw new Error('record not found')
    }        
}

