import express from "express";
import {getAllUsers,getUserById,createNewUser,loginUser,logoutUser,updateUserById,deleteUserById} from "../controllers/userController";
import { isAuthorized } from "../middleware/auth";

const router=express.Router();

router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.post('/auth/signup',createNewUser);
router.post('/auth/login',loginUser);
router.get('/auth/logout',logoutUser);
router.put('/:userId',[isAuthorized],updateUserById);
router.delete('/:userId',[isAuthorized],deleteUserById);


export default router;