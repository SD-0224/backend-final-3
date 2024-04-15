import { Request, Response } from 'express';
import db from "../models";
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

// This method returns a user by id including their orders,addresses,reviews
const getUserById = async (req:Request,res:Response) => {

    const userId=req.params.id;

    db.User.findByPk(userId, {
            include:[{model:db.Order,
            attributes: ['id', 'createdAt', 'category', 'status'],
            include:{model:db.Product,
            attributes: ['id', 'quantity'],
            through: { attributes: [] }}},
            {
            model:db.Address,
            attributes: ['id']
            },
            {
            model:db.Review,
            attributes: ['productId','rating','content']
            }
            ]})
    .then((user:any) => {
        if(!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json({user})
    })
    .catch((error:Error) => {
        // tslint:disable-next-line:no-console
        console.error('Error finding user:', error);
        res.status(500).json({ error: 'Internal server error' });
    })
}


// This method creates a new user
const createNewUser = async (req:Request,res:Response) => {

    const {firstName,lastName, email,phone,dateofbirth,avatar, password} = req.body;
    // check if the email exists
    const userExists= await db.User.findOne({where:{email}});
    if(userExists) {
        return res.status(400).send('Email is already associated with an account');
    }
    db.User.create({
            firstName,
            lastName,
            email,
            phone,
            dateofbirth,
            avatar,
            password,
         })
    .then((user:any) => {
        // tslint:disable-next-line:no-console
        console.log("user created successfully");
        res.json({user,message:"user created successfully"});
    })
    .catch((error:Error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
            // tslint:disable-next-line:no-console
            console.error('Error creating user:', 'Email address must be unique');
            res.status(400).json({error:"Email address must be unique"})
          }
        else {
            // tslint:disable-next-line:no-console
            console.log(error.message);
            res.status(400).json(error.message)
        }

    })

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