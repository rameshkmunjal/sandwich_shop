import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const inventorySchema=new Schema({
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */ 
    bookId:{type:Number, default:0},   
    itemId:{type:String, default:''}, /*  for  a item info */ 
    sr:{type:String, default:''}, /*  sr number */
    category: {type:String, default:''}, /*  for category like grocery */ 
    itemName:{type:String, default:''}, /*  for itemName */      
    qty:{type:Number, default:''}, /*  example 100, 60 etc */
    rate:{type:Number, default:0}, /*  example 100, 60 etc */
    amount:{type:Number, default:0}, /*  example 10000, 600 etc */     
    remainingStock: {type:Number, default:0}, /*  example 10000, 600 etc */
    stockReleased:{type:String, default:''} , /*  example 10000, 600 etc */ 
    rlDates:{type:String, default:''} /* storing dates of release  */
})

//[{quantity: Number,marketId: String}]


const InventoryModel = mongoose.model('inventory', inventorySchema);
export default InventoryModel;

