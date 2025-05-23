import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const purchaseSchema=new Schema({
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */    
    itemId:{type:String, default:''}, /*  for  a item info */ 
    bookId:{type:Number, default:0 },
    buyDate:{type:String, default:''}, /*  example 20/09/2024 etc */
    month:{type:String, default:''},
    fy:{type:String, default:''}, /* financila year */
    category: {type:String, default:''}, /*  for category like grocery */ 
    itemName:{type:String, default:''}, /*  for itemName */      
    qty:{type:Number, default:''}, /*  example 100, 60 etc */
    rate:{type:Number, default:''}, /*  example 100, 60 etc */
    amount:{type:Number, default:''}, /*  example 10000, 600 etc */    
    seller:{type:String, default:''},/* example : dairy, bakery */    
})


const PurchaseModel = mongoose.model('purchase', purchaseSchema);
export default PurchaseModel;