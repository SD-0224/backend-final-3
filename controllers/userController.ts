import { Request, Response } from 'express';
import db from "../models"
import { error } from 'console';


// This method returns all users
const getAllUsers = async(req:Request,res:Response) => {

    db.User.findAll({raw:true})
    .then((users:any) => {
        res.json({users})
    })
    .catch((error:Error) => {
        res.status(500).json({ error: 'Database error' });
    })
}

// This method returns a user by id
const getUserById = async (req:Request,res:Response) => {

    // const userId=req.params.id;

    // db.User.findOne({where:{id:userId}, include:[{model:db.Order, include:[db.ProductOrder]}]})
    // .then((user:any) => {
    //     if(!user) {
    //         res.status(404).json({ error: 'User not found' });
    //         return;
    //     }
    //     res.json({user})
    // })
    // .catch((error:Error) => {
    //     // tslint:disable-next-line:no-console
    //     console.error('Error finding user:', error);
    //     res.status(500).json({ error: 'Internal server error' });
    // })
}


// This method creates a new user
const createNewUser = async (req:Request,res:Response) => {

    return;
}


// This method handles user login
const loginUser = async (req:Request,res:Response) => {
    return;
}


// This method handles user logout
const logoutUser = async (req:Request,res:Response) => {
    return;
}


// this method updates user account
const updateUserById = async (req:Request,res:Response) => {
    return;
}


// This method deletes user account
const deleteUserById = async (req:Request,res:Response) => {
    return;
}




export {getAllUsers,getUserById,createNewUser,loginUser,logoutUser,updateUserById,deleteUserById}