import ItemModel from '../schema/item.js';
import {
    unitLetterCodes,
    unitDigitCodes
} from '../JsonData/data.js';
import {sortList, getItem, make5LettersStr} from './itemFunctions.js';

export const createItemInfo=async(req, res)=>{
    //console.log("createItemInfo called");
    const {name, desc, unit} = req.body;
    console.log("payload inside req body :", req.body);    

    const item=getItem(name);
    console.log("line no. 25  : " , item);
    
    const itemName=item.name;
    const category=item.category;
    const unitCode=unitDigitCodes[unitLetterCodes.indexOf(unit)];

    let meas=make5LettersStr(desc);
    const id=item.code+""+meas+""+unitCode;
    console.log(id);
      
    const i = await ItemModel.create({id, itemName, category, desc, unit});
    
    

    if (i) {        
        console.log(i);
        res.status(201).json({
            id:i.id,
            itemName:i.itemName,
            category:i.category,
            desc:i.desc,
            unit:i.unit
        })
    } else {
        res.status(400).json({message:"Invalid Item data"});
        throw new Error('Invalid item data')
    }
}

/* GET API to get item info list */
export const getItemInfoList=async(req, res)=>{
    const itemList=await ItemModel.find();
    console.log(itemList);
    if(itemList){
        res.json(sortList(itemList));
    } else {
        res.status(404);
        throw new Error('itemList Not Found');
    }
}


/* DELETE API related functions */
export const deleteItemInfo= async (req, res) => {
    const item = await ItemModel.findOne({ _id: req.params.id })
  
    if (item) {
      await item.deleteOne()
      res.json({ message: 'clicked item record deleted' })
    } else {
      res.status(404)
      throw new Error('item not found')
    }
}

// @desc    Edit an item
// @route   PUT /item/:itemId
// @access  
/*
export const editItem = async (req, res) => {
    console.log(req.body);
    const {
        _id,
        name,
        desc,
        unit
    } = req.body
  
    const item = await ItemModel.findOne({'_id':_id});
    const itemNameCode=getItem(name);
    const UnitCode=unitDigitCodes[unitLetterCodes.indexOf(unit)];
    let str2=make5LettersStr(desc2);
    let updatedItemId=itemNameCode+str2+UnitCode;
    console.log(updatedItemId);
  
  console.log(item);
    if (item) { 
        item.id=updatedItemId,
        item.desc1=desc1,
        item.desc2=desc2,
        item.unit=unit  
  
        const updatedItem = await item.save();
        console.log(updatedItem);
        res.json(updatedItem);
    } else {
      res.status(404)
      throw new Error('Item not found')
    }
  }
*/

export const getItemById = async (req, res) =>{    
      const item = await ItemModel.findOne({ _id: req.params.id });      
        if (item) {
          res.json(item)
        } else {
          res.status(404)
          throw new Error('Item not found')
        }
    }







  