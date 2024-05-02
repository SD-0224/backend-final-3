import express from "express";
import {getAllUsers,getUserById,createNewUser,loginUser,logoutUser,updateUserById,deleteUserById} from "../controllers/userController";

const router=express.Router();

router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.post('/signup',createNewUser);
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.put('/:userid',updateUserById);
router.delete('/:userid',deleteUserById);


export default router;