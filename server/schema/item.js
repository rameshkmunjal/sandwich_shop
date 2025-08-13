import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemSchema=new Schema({
    id:{type:String, default:''} ,//name of item
    itemCode:{type:String, default:'' },
    itemName:{type:String, default:'' },
    category:{type:String, default:''}, //GR , PK, CD , SP, FF etc  
    flag:{type:Boolean, default:false}     
})

//GRINATTA500GM - category, trans_nature, brand, description1, description2, meas_unit
const ItemModel = mongoose.model('iytm', itemSchema);
export default ItemModel;
//itemId	category	itemName