import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema=new Schema({
    id:{type:String, default:''} ,//name of item
    category:{type:String, default:''}, //GR , PK, CD , SP, FF etc
    itemName:{type:String, default:''} ,//name of item
    desc:{type:String, default:''} ,//weight of item    
    unit:{type:String, default:''} , //GM, LT etc        
})

//GRINATTA500GM - category, trans_nature, brand, description1, description2, meas_unit
const ItemModel = mongoose.model('iytm', itemSchema);
export default ItemModel;
//itemId	category	itemName