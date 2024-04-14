import express from "express";
import {getAllUsers,getUserById,createNewUser,loginUser,logoutUser,updateUserById,deleteUserById} from "../controllers/userController";

const router=express.Router();

router.get('/users',getAllUsers);
router.get('/users/:id',getUserById);
router.post('/users',createNewUser);
router.post('/users/login',loginUser);
router.get('/users/logout',logoutUser);
router.put('/users/:userid',updateUserById);
router.delete('/users/:userid',deleteUserById);


export default router;