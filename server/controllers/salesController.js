import SaleModel from '../schema/sales.js';
import shortId from 'shortid';
import {sortList} from './itemFunctions.js';
import {findMonthOfBuyDate, findFyOfBuyDate} from './purchaseFunctions.js';


export const createSalesTransaction=async(req, res)=>{
    console.log("createSalesTransaction called", req.body);
    const {date, amount, outlet} = req.body;
    console.log("payload inside req body :", typeof(date));
    const id=shortId.generate(); 
    
    const dd=date[0]+date[1];
    const mm=date[2]+date[3];
    const yyyy=date[4]+date[5]+date[6]+date[7];
    const transDate=  dd+'-'+mm+'-'+yyyy;
    const month=findMonthOfBuyDate(date);
    const fy=findFyOfBuyDate(date);
    console.log("month got from function : ", month);
    const i = await SaleModel.create({id,transDate, month, fy,  amount, outlet});

    if (i) {        
        //console.log(i);
        res.status(201).json({
            id:i.id,
            transId:i.transId,
            transDate:i.transDate,
            month:i.month, 
            fy:i.fy,
            amount:i.amount,
            outlet:i.outlet
        })
    } else {
        res.status(400).json({message:"Invalid Sales data"});
        throw new Error('Invalid sales data')
    }
}


/* GET API to get item info list */
export const getSalesList=async(req, res)=>{
    const salesList=await SaleModel.find();
    //console.log(salesList);
    if(salesList){
        res.json(salesList);
    } else {
        res.status(404);
        throw new Error('salesList Not Found');
    }
}

export const getMonthlySalesList=async(req, res)=>{
  const list=await SaleModel.find({'month':req.params.month});
  if(list){
      res.json(sortList(list));
  } else {
      res.status(404);
      throw new Error('monthwise SalesList Not Found');
  }

}


export const getSalesById = async (req, res) =>{    
    const sale = await SaleModel.findOne({ _id: req.params.id });      
      if (sale) {
        res.json(sale)
      } else {
        res.status(404)
        throw new Error('sale not found')
      }
  }

/* DELETE API related functions */
export const deleteSales= async (req, res) => {
    console.log(req.params.id);
    const sale = await SaleModel.findOne({ _id: req.params.id })
  
    if (sale) {
      await sale.deleteOne()
      res.json({ message: 'clicked sale record deleted' })
    } else {
      res.status(404)
      throw new Error('sale not found')
    }
}

function validateDate(y, m, d,  res){
  let currentDate=new Date();
  let currentYear=currentDate.getFullYear();
  let currentMonth=currentDate.getMonth()+1;
  let currentDay=currentDate.getDate();
  console.log(currentDate, currentMonth, currentDay);
  let currentDateInSeconds=currentDate.getTime();
  let inputDateInSeconds=new Date(y+"-"+m+"-"+d).getTime();
  console.log(currentDateInSeconds, inputDateInSeconds);  
  if(inputDateInSeconds > currentDateInSeconds){
    res.status(406);
    res.json({ statusCode:'406', message: 'input date is greater than current date : input not acceptable' })
    throw new Error('invalid date');
  }

  if(y===currentYear && m > currentMonth){
    res.status(406);
    res.json({ statusCode:'406', message: 'input date is greater than current date : input not acceptable' })
    throw new Error('invalid date');
  }

  if( y===currentYear && m === currentMonth && d > currentDate ){
    res.status(406);
    res.json({ statusCode:'406', message: 'input date is greater than current date : input not acceptable' })
    throw new Error('invalid date');
  }

  if(y > currentYear){
    res.status(406);
    res.json({ statusCode:'406', message: 'input date is greater than current date : input not acceptable' })
    throw new Error('invalid date');
  }

  return;
}