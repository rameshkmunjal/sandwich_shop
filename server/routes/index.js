/*dependencies */
import express from 'express';
const router=express.Router();
/* including files */
//import {createUser, getAllUsers} from '../controllers/userController.js';
import {
    createItem,
    getItemById,
    getItemInfoList,
    deleteItemInfo
} from '../controllers/itemController.js';
import {
    createInventory,  
    addInventory, 
    releaseInventory,
    getInventoryList, 
    getItemReleaseDetails,     
    getItemReleaseSummary,    
    getInventoryItemSummary,
    getInventoryCategorySummary,
    deleteInventory,
    editInventory, 
    getInventoryById,

} from '../controllers/inventoryController.js';
import {    
    getPurchasesList,
    getMonthlyPurchaseList,
    createPurchase,     
    deletePurchase,
} from '../controllers/purchaseController.js';
import { createSalesTransaction, deleteSales } from '../controllers/salesController.js';
import { getSalesList , getMonthlySalesList, getSalesById} from '../controllers/salesController.js';
import { createTransaction,  getTransactionList, getTransactionById, deleteTransaction, getList, updateAccounts} from '../controllers/transactionController.js';

/* GET */
router.get('/bank/list', getList);
router.get('/item/list', getItemInfoList);
router.get('/item/:id', getItemById);
router.get('/inventory/list', getInventoryList);
router.get('/inventory/item/summary/:category', getInventoryItemSummary);
router.get('/inventory/category/summary', getInventoryCategorySummary);
router.get('/item/release/list/:month/:year', getItemReleaseDetails);
router.get('/item/release/summary/:month/:year', getItemReleaseSummary);
//${baseUrl}/item/release/list
router.get('/purchases/list', getPurchasesList);
router.get('/purchases/list/:month', getMonthlyPurchaseList);
router.get('/transaction/list', getTransactionList);
router.get('/transaction/:id', getTransactionById);
router.get('/sales/list', getSalesList);
router.get('/sales/list/:month', getMonthlySalesList);
router.get('/sales/:id', getSalesById);
router.get('/inventory/:id', getInventoryById);
/* POST */
router.post('/item/create', createItem);
router.post('/inventory/create', createInventory);
router.post('/create/purchase/:id', createPurchase);
router.post('/inventory/add', addInventory);
router.post('/inventory/release', releaseInventory);

router.post('/sales/create', createSalesTransaction);
router.post('/transaction/create', createTransaction);
router.post('/transaction/update/accounts', updateAccounts);



router.put('/inventory/edit/:id', editInventory);
/* DELETE */
router.delete('/transaction/delete/:id', deleteTransaction);
router.delete('/item/delete/:id', deleteItemInfo);
router.delete('/inventory/delete/:id', deleteInventory);
router.delete('/purchase/delete/:id', deletePurchase);
router.delete('/sales/delete/:id', deleteSales);

/* GET */
//router.get('/users/list', getAllUsers);
/* POST */
//router.post('/user/login', login);
//router.post('/user/create', createUser);

/* PUT */
//router.put('/user/edit/:id', editUser);
//router.put('/user/authorise', authoriseUser);
/* DELETE */
//router.delete('/user/delete/:id', deleteUser);

export default router;