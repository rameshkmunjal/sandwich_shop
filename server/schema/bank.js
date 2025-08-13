import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bankSchema=new Schema({
    transId:{type:String, default:''},
    balance:{type:Number, default:0}       
})

//GRINATTA500GM - category, trans_nature, brand, description1, description2, meas_unit
const BankModel = mongoose.model('bank', bankSchema);
export default BankModel;