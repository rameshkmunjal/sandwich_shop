import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const saleSchema=new Schema({
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */
    transId:{type:String, default:''},//ex 120 or 27474
    transDate:{type:String, default:''} ,//transaction date - 25012025
    fy:{type:String, default:''} ,//transaction fy - 2024-25
    month:{type:String, default:''} ,//transaction month - 01
    amount:{type:Number, default:0} , //10000 etc
    outlet:{type:String, default:''} ,// Big Burly, Chatora Point  etc  
})

const SaleModel = mongoose.model('sale', saleSchema);
export default SaleModel;