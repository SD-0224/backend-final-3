import { Request, Response } from 'express';
import db from "../models";
import { error } from 'console';
import { Op } from "sequelize";


// This method returns all users
const getAllUsers = async(req:Request,res:Response) => {
    try {

        const users= await db.User.findAll({attributes: { exclude: ['createdAt','updatedAt', 'dateOfBirth'] },
        include: {model:db.Address,as: "addresses",
        attributes: { exclude: ['createdAt','updatedAt', 'userId'] }}})
        const normalizedUsers:any=[]
        users.map((user:any) => {
        const transformedAddress:any={}
        user.addresses.forEach((addr:any) => {
        transformedAddress[addr.id] = {
            fullName: addr.fullName,
            pinCode: addr.pinCode,
            city: addr.city,
            state: addr.state,
            streetAddress: addr.streetAddress,
            mobileNumber: addr.mobileNumber
            };
            user.addresses={...transformedAddress};

        })
        const normalizedUser:any= {

            id:user.id,
            user:user.user,
            password:user.password,
            avatar: user.avatar,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.phone,
            email: user.email,
            address:user.addresses

        }
        normalizedUsers.push(normalizedUser)

});


        res.json(normalizedUsers)
    }
    catch {
        res.status(500).json({ error: 'Internal server error' });
    }

}

// This method returns a user by id including their orders,addresses,reviews
const getUserById = async (req:Request,res:Response) => {

    const userId=req.params.id;

    try {
        const user= await db.User.findByPk(userId, {attributes: { exclude: ['createdAt','updatedAt'] },
        include:[
        {
        model:db.Address,as: "addresses",
        attributes: { exclude: ['createdAt','updatedAt','userId'] }
        }
        ]})
        if(!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const userData= {
            id:user.id,
            avatar: user.avatar,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.phone,
            email: user.email,
            address: user.addresses.reduce((acc: { [addressId: string]: any }, address: any) => {
                acc[address.id] = {
                    fullName:address.fullName,
                    pinCode:address.pinCode,
                    city:address.city,
                    state:address.state,
                    streetAddress:address.streetAddress,
                    mobileNumber:address.mobileNumber
                } ;

                return acc;
            }, {}),
        }

        res.json(userData)
    }
    catch {
        res.status(500).json({ error: 'Internal server error' });
    }

}


// This method creates a new user
const createNewUser = async (req:Request,res:Response) => {

    // tslint:disable-next-line:no-console
    console.error("hello");

    const {firstName,lastName,user, email,phone,dateOfBirth,password} = req.body;
    // check if the email or username exists
    const userExists= await db.User.findOne({where:{[Op.or]: [{ email }, { user }]}});
    if(userExists) {
        return res.status(400).send('Email or username is already associated with an account');
    }
    db.User.create({
            firstName,
            lastName,
            user,
            email,
            phone,
            dateOfBirth,
            password,
         })
    .then((user:any) => {
        res.json({user,message:"user created successfully"});
    })
    .catch((error:Error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({error:"Email address must be unique"})
          }
        else {
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