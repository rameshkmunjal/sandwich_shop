import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const addSchema = new Schema({
  addId:{type:String, unique:true},
  quantity: Number,
  amount:Number,
  date: { type: Date, default: Date.now }
});


const releaseSchema = new Schema({    
    quantity: Number,
    amount:Number,
    releasedTo: String,
    releasedBy: String,
    date: { type: Date, default: Date.now }
  });
  
  const inventorySchema=new Schema({
    id:{type:String, unique:true},/* unique id : for record - deletion, edit */
    itemId:{type:String, default:''},
    itemName:{type:String, default:''},
    category:{type:String, default:''},
    cql:{type:Number, default:0}, /* critical quantity level */
    currentQty:{type:Number, default:0},
    unitPrice:{type:Number, default:0},
    currentValue:{type:Number, default:0},
    addition:[addSchema],
    releases: [releaseSchema]
  });  


const InventoryModel = mongoose.model('inventory', inventorySchema);
export default InventoryModel;

/*
{
  "itemName": "Burger Patty",
  "totalStock": 100,
  "releases": [
    {
      "quantity": 10,
      "releasedTo": "Kitchen",
      "releasedBy": "Admin",
      "date": "2025-07-10T12:30:00Z"
    },
    {
      "quantity": 5,
      "releasedTo": "Outlet 2",
      "releasedBy": "Manager",
      "date": "2025-07-10T15:00:00Z"
    }
  ]
}

Here, the releases field is an array of release records, and you can keep pushing new objects 
into it each time stock is released.

const releaseSchema = new mongoose.Schema({
  quantity: Number,
  releasedTo: String,
  releasedBy: String,
  date: { type: Date, default: Date.now }
});

const stockSchema = new mongoose.Schema({
  itemName: String,
  totalStock: Number,
  releases: [releaseSchema]
});

const Stock = mongoose.model("Stock", stockSchema);
*/



