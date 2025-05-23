import shortId from 'shortid';
import ItemModel from '../schema/item.js';
import PurchaseModel from '../schema/purchase.js';
import InventoryModel from '../schema/inventory.js';
import {sortList} from './itemFunctions.js';

import {
    createBookId, findFyOfBuyDate, findMonthOfBuyDate
} from './purchaseFunctions.js';


export const getPurchasesList=async(req, res)=>{
    const purchaseList=await PurchaseModel.find();
    //console.log(purchaseList);
    if(purchaseList){
        res.json(sortList(purchaseList));
    } else {
        res.status(404);
        throw new Error('purchaseList Not Found');
    }
}

export const deletePurchase= async (req, res) => {
    const purchase = await PurchaseModel.findOne({ id: req.params.id });    
    const inventory = await InventoryModel.findOne({ id: req.params.id })
  
    if (purchase && inventory) {
      await purchase.deleteOne();
      await inventory.deleteOne();
      res.json({ message: 'clicked purchase record deleted' })
    } else {
      res.status(404)
      throw new Error('purchase or inventory record not found')
    }
}

export const createPurchase=async(req, res)=>{    
    //console.log("createPurchase called");
    const purchaseList=await PurchaseModel.find();
    const {itemId,buyDate,seller, qty, amount } = req.body;
    const item = await ItemModel.findOne({id:itemId });
    
    console.log("payload inside req body :", req.body);
    const itemName=item.itemName+" "+item.desc+" "+item.unit;
    const category=item.category;

    const remainingStock=qty;
    const id=shortId.generate();
    const bookId=createBookId(purchaseList);
    const fy=findFyOfBuyDate(buyDate);
    const month=findMonthOfBuyDate(buyDate);
    
    //console.log(buyDate);
    let newPurchaseObj={};
    let newInventoryObj={};
    const i = await PurchaseModel.create({
        id, 
        bookId,        
        itemId, 
        buyDate,
        month,
        fy,
        itemName, 
        category,        
        qty,
        amount,
        seller        
    })    
    
    const j = await InventoryModel.create({
            id,   
            bookId,      
            itemId, 
            itemName, 
            category,        
            qty,
            amount , 
            remainingStock      
    })
        

     if(i && j){   
//console.log(i);
        newPurchaseObj={
                id: i.id,
                bookId:i.bookId,
                itemId:i.itemId, 
                month:i.month,
                buyDate:i.buyDate,
                fy:i.fy,
                category:i.category,
                itemName:i.itemName, 
                qty:i.qty,
                amount:i.amount,
                seller:i.seller
        }
        
    
        newInventoryObj={
            id: j.id,
            bookId:i.bookId,
            itemId:j.itemId, 
            category:j.category,
            itemName:j.itemName, 
            qty:j.qty,
            amount:j.amount,
            remaingingStock:i.remaingingStock
        }
     
        let responseObj={purchaseResponseObj:newPurchaseObj, inventoryResponseObj:newInventoryObj};
        res.status(201).json(responseObj);
    } else {
        res.status(400).json({message:"Purchase creation data problem happened"});
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