import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const transactionSchema=new Schema({
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */
    transId:{type:String, default:''},//ex 120 or 27474
    transDate:{type:String, default:''} ,//transaction date - 25012025
    fy:{type:String, default:''} ,//transaction fy - 2024-25
    month:{type:String, default:''} ,//transaction month - 01
    party:{type:String, default:''} ,//in purchase - paid to , in sales - received from
    itemId:{type:String, default:''} ,
    amount:{type:Number, default:0} , //10000 etc
    transType:{type:String, default:''} ,// Debit , Credit  etc  
    transCode:{type:String, default:''} ,// in purchase expense or sales item/trans Code
    posted:{type:Boolean, default:false},
    isAlive:{type:Boolean, default:true}
})

const TransactionModel = mongoose.model('transaction', transactionSchema);
export default TransactionModel;