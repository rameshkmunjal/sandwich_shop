import shortId from 'shortid';

import InventoryModel from '../schema/inventory.js';
import { 
  getCategorySummary, 
  getReleaseMasterData,
  addStatusToInventoryList,
  getCategoryTotal,
  getGroupTotal,
  sortListOnDay,
  summarizeItemCodes,
  getReleaseItemsAmountTotal,
  getFilteredData
} from './inventoryFunctions.js';
import {sortList, make5LettersStr} from './itemFunctions.js';

/* DELETE API related functions */
export const deleteInventory= async (req, res) => {
    const inventory = await InventoryModel.findOne({ 'id': req.params.id })
  
    if (inventory) {
      await inventory.deleteOne()
      res.json({ message: 'clicked inventory record deleted' })
    } else {
      res.status(404)
      throw new Error('inventory not found')
    }
}

export const getInventoryList=async(req, res)=>{
    const inventoryList = await InventoryModel.find().lean();
    const gt=getGroupTotal(inventoryList);
    const list=addStatusToInventoryList(inventoryList);
    //console.log("List: ", list);
    if(list){
        res.json({gt:gt, inventoryList:sortList(list)});
    } else {
        res.status(404);
        throw new Error('inventoryList Not Found');
    }
}

export const getInventoryItemSummary=async(req, res)=>{
    //console.log("req params : " , req.params);
    
    const list=await InventoryModel.find({'category':req.params.category}).lean();
    const gt=getGroupTotal(list);
    //console.log(list);
    if(list){
      res.json({gt:gt, inventoryList:sortList(list)});
    } else {
            res.status(404);
            throw new Error('inventoryList Not Found');
    }           
}


export const getInventoryCategorySummary=async(req, res)=>{
    const list=await InventoryModel.find();
    //console.log(list);

    
    let newArr=getCategorySummary(list);
    let gt=getCategoryTotal(newArr);
    //console.log("line 194 :", newArr);
    if(newArr){
        res.json({summary:newArr, gt:gt});
    } else {
        res.status(404);
        throw new Error('inventoryList Not Found');
    }
}

export const getInventoryById = async (req, res) =>{ 
  //console.log("params inside getInventoryById", req.params._id);   
    const inventory = await InventoryModel.findOne({ id: req.params.id });      
      if (inventory) {
        res.json(inventory)
      } else {
        res.status(404)
        throw new Error('Inventory not found')
      }
  }

  // @desc    Edit an item
// @route   PUT /item/:itemId
// @access  
export const editInventory = async (req, res) => {
    //console.log("payload editInventory axios call", req.body);
    
    const {  
        id,      
        itemId, 
        itemName, 
        category,
        cql,        
        currentQty,
        unitPrice         
    } = req.body
    let currentValue=Number(currentQty)*Number(unitPrice);
    const i = await InventoryModel.findOne({'id':id});
    
  
  //console.log(i);
    if (i) {
        i.id=id, 
        i.itemId=itemId, 
        i.itemName=itemName, 
        i.category=category,        
        i.currentQty=Number(currentQty),
        i.currentValue=currentValue,
        i.cql=Number(cql),   
        i.unitPrice=Number(unitPrice);
  
        const updatedInventory = await i.save();
        //console.log("updatedInventory....", updatedInventory);
        res.json(updatedInventory);
    } else {
      res.status(404)
      throw new Error('record not found')
    }
  }


export const getItemReleaseDetails=async(req, res)=>{  
  
    const list = await InventoryModel.find().lean();
    //console.log(list);
    const masterData=getReleaseMasterData(list);
    const revisedList=sortListOnDay(getFilteredData(masterData, req.params.month, req.params.year));
    const gt=getReleaseItemsAmountTotal(revisedList);

    if (revisedList) {
        res.json({revisedList: revisedList, gt:gt});
    } else {
      res.status(404)
      throw new Error('record not found')
    }        
}

export const createInventory=async(req, res)=>{    
    const {
        date, itemCode, itemName,unitDesc,  
        category,  quantity, cql, unitPrice 
      }=req.body;
    //console.log(date);
    const id=shortId.generate();
    const addId=shortId.generate();
    const inventoryList=await InventoryModel.find();
    const itemId=itemCode+make5LettersStr(unitDesc);

    const exists = inventoryList.findIndex(i => i.itemId === itemId) !== -1;

    if(exists){
      res.json({message:"item id already exists. use add stock to add further."})
    }

    let amount=Number(quantity)*Number(unitPrice);
    
    
    const inventoryItem = new InventoryModel({
        id: id,
        itemId: itemId,
        itemName: itemName,
        category:category,
        currentQty: quantity,
        cql:cql,
        unitPrice:unitPrice,
        currentValue: amount,
        addition: [
          {
            addId: addId,
            quantity: quantity,
            amount: amount,
            date:date
          }
        ],
        releases: [] // empty initially
      });
    
      try {
        const result = await inventoryItem.save();
        //console.log('New Inventory Saved:', result);
        res.json(result);
      } catch (err) {
        //console.error('Error:', err.message);
        throw new Error('Inventory could not be created');
      }
}


export const addInventory = async (req, res) => {
  const {id, quantity }=req.body;
  const item=await InventoryModel.findOne({'id':id});
  const amount=Number(quantity)*Number(item.unitPrice);
  const addId=shortId.generate();
  const additionEntry = {
      addId:addId,
      quantity: quantity,
      amount: amount,
      date:Date.now()
  };

  try {
    const updated = await InventoryModel.findOneAndUpdate(
      { id: id },
      {
        $push: { addition: additionEntry },
        $inc: {
          currentQty: additionEntry.quantity,
          currentValue: additionEntry.amount
        }
      },
      { new: true }
    );

    //console.log('Stock Added:', updated);
    res.json(updated);
  } catch (err) {
    //console.error('Error adding stock:', err.message);
    res.json({error:err.message});
  }
};

export const releaseInventory = async (req, res) => {
  const {id,  quantity}=req.body;
  const item=await InventoryModel.findOne({'id':id});
  const amount=Number(quantity)*Number(item.unitPrice);

  const releaseId=shortId.generate();

  const releaseEntry = {
    releaseId:releaseId,
    quantity: quantity,
    amount: amount,
    date:Date.now(),
    releasedTo: 'Kitchen',
    releasedBy: 'Madhur'
  };

  try {
    const updated = await InventoryModel.findOneAndUpdate(
      { id: id },
      {
        $push: { releases: releaseEntry },
        $inc: {
          currentQty: -releaseEntry.quantity,
          currentValue: -releaseEntry.amount
        }
      },
      { new: true }
    );

    //console.log('Stock Released:', updated);
    res.json(updated);
  } catch (err) {
    //console.error('Error releasing stock:', err.message);
    res.json({message:'Error releasing stock'})
  }
};

export const getItemReleaseSummary=async(req,res)=>{
    const list = await InventoryModel.find().lean();
    //console.log(list);
    const masterData=getReleaseMasterData(list);
    const resultObj=summarizeItemCodes(getFilteredData(masterData, req.params.month, req.params.year));

      if(resultObj){
        console.log('Stock Released Summary:', resultObj);
        res.json(resultObj);
      } else {
        //console.error('Error releasing stock:', err.message);
        res.json({message:'data could not be fetched'})
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



/*

   arr[5].releases[0].itemId="90100000";
   arr[5].releases[0].itemName="Potato Patkha";
   arr[5].releases[0].category="Products";
   return arr[5].releases;
   */