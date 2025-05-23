/*dependencies */
import express from 'express';
const router=express.Router();
/* including files */
//import {createUser, getAllUsers} from '../controllers/userController.js';
import {
    createItemInfo,
    getItemById,
    getItemInfoList,
    deleteItemInfo
} from '../controllers/itemController.js';
import {
    createInventory,    
    getInventoryList, 
    getItemReleaseDetails,
    
    getInventoryItemSummary,
    getInventoryCategorySummary,
    deleteInventory,
    editInventory, 
    getInventoryById
} from '../controllers/inventoryController.js';
import {    
    getPurchasesList,
    getMonthlyPurchaseList,
    createPurchase,     
    deletePurchase,
} from '../controllers/purchaseController.js';
import { createSalesTransaction, deleteSales } from '../controllers/salesController.js';
import { getSalesList , getMonthlySalesList, getSalesById} from '../controllers/salesController.js';

/* GET */
router.get('/item/list', getItemInfoList);
router.get('/item/:id', getItemById);
router.get('/inventory/list', getInventoryList);
router.get('/inventory/item/summary/:category', getInventoryItemSummary);
router.get('/inventory/category/summary', getInventoryCategorySummary);
router.get('/item/release/details/:id', getItemReleaseDetails);
//(`${baseUrl}/item/release/details/${id}`)
router.get('/purchases/list', getPurchasesList);
router.get('/purchases/list/:month', getMonthlyPurchaseList);

router.get('/sales/list', getSalesList);
router.get('/sales/list/:month', getMonthlySalesList);
router.get('/sales/:id', getSalesById);
router.get('/inventory/:id', getInventoryById);
/* POST */
router.post('/item/create', createItemInfo);
router.post('/inventory/create', createInventory);
router.post('/purchase/create', createPurchase);

router.post('/sales/create', createSalesTransaction);



router.put('/inventory/edit/:id', editInventory);
//router.put('/item/edit/:_id', editItem);
/* DELETE */
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