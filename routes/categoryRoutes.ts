import express from "express"
import {getAllCategories,getCategoryById,getCategoryBrands,filterByCategoryByBrand,getAllBrands,getBrandById} from "../controllers/categoryController";

const router=express.Router();

router.get('/categories',getAllCategories)
router.get('/categories/:id',getCategoryById)
router.get('/categories/:id/brands',getCategoryBrands)
router.get('/categories/:id/brands/:id',filterByCategoryByBrand)
router.get('/brands',getAllBrands)
router.get('/brands/:id',getBrandById)




export default router;