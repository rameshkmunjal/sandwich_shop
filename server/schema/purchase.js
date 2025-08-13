import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const purchaseSchema=new Schema({
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */ 
    transId:{type:String, default:0 },  /* common field to join tables */ 
    itemId:{type:String, default:''}, /*  for  a item info */  
    itemName:{type:String, default:''}, /*  item name with full details */  
    category:{type:String, default:''}, /*  like grocery, packaging */   
    qty:{type:Number, default:''}, /*  example 100, 60 etc */   
})


const PurchaseModel = mongoose.model('purchase', purchaseSchema);
export default PurchaseModel;