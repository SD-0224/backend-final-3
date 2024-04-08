import express from "express"
import {getAllProducts,getProductById,getProductsByCategoryId,getProductsByBrandId,createNewProduct} from "../controllers/productController";

const router=express.Router();
router.get('/products',getAllProducts);
router.get('/products/:id',getProductById);
router.get('/products/category/:id',getProductsByCategoryId);
router.get('/products/brand/:id',getProductsByBrandId);
router.post('/products',createNewProduct)



export default router;