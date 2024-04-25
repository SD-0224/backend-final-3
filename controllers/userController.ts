import { Request, Response } from 'express';
import db from "../models";
import { error } from 'console';


// This method returns all users
const getAllUsers = async(req:Request,res:Response) => {

    db.User.findAll({raw:true, attributes: { exclude: ['createdAt','updatedAt'] }})
    .then((users:any) => {
        res.json(users)
    })
    .catch((error:Error) => {
        res.status(500).json({ error: 'Database error' });
    })
}

// This method returns a user by id including their orders,addresses,reviews
const getUserById = async (req:Request,res:Response) => {

    const userId=req.params.id;

    try {
        const user= await db.User.findByPk(userId, {attributes: { exclude: ['createdAt','updatedAt'] },
        include:[{model:db.Order,as: "orders",
        attributes: ['id', 'createdAt', 'category', 'status'],
        include:[{model:db.Product,as: "products",
        attributes: ['id', 'quantity'],
        through: { attributes: [] }},
        {model:db.Address,as: 'address',attributes: { exclude: ['createdAt','updatedAt','userId']}}]},
        {
        model:db.Address,as: "addresses",
        attributes: { exclude: ['createdAt','updatedAt','userId'] }
        },
        {
        model:db.Review,as: "reviews",
        attributes: ['productId','rating','content']
        }
        ]})
        if(!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        const userData= {
            id:user.id,
            user:user.user,
            password:user.password,
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
                    staty:address.state,
                    streetAddress:address.streetAddress,
                    mobileNumber:address.mobileNumber
                } ;

                return acc;
            }, {}),
            reviews: user.reviews.reduce((acc: { [productId: string]: any }, review: any) => {
                acc[review.productId] = {
                    rating: review.rating,
                    review: review.content
                };
                return acc;
            }, {}),
            orders: user.orders.reduce((acc: { [orderId: string]: any }, order: any) => {
                acc[order.id] = {
                    products: order.products,
                    date:order.createdAt,
                    category:order.category,
                    status:order.status,
                    address:order.address
                };
                return acc;
            }, {})

        }

        res.json(userData)
    }
    catch {
        res.status(500).json({ error: 'Internal server error' });
    }

    // db.User.findByPk(userId, {attributes: { exclude: ['createdAt','updatedAt'] },
    //     include:[{model:db.Order,as: "orders",
    //     attributes: ['id', 'createdAt', 'category', 'status'],
    //     include:{model:db.Product,as: "products",
    //     attributes: ['id', 'quantity'],
    //     through: { attributes: [] }}},
    //     {
    //     model:db.Address,as: "addresses",
    //     attributes: ['id']
    //     },
    //     {
    //     model:db.Review,as: "reviews",
    //     attributes: ['productId','rating','content']
    //     }
    //     ]})
    // .then((user:any) => {
    //     if(!user) {
    //         res.status(404).json({ error: 'User not found' });
    //         return;
    //     }
    //     res.json(user)
    // })
    // .catch((error:Error) => {
    //     res.status(500).json({ error: 'Internal server error' });
    // })
}


// This method creates a new user
const createNewUser = async (req:Request,res:Response) => {

    const {firstName,lastName,user, email,phone,dateofbirth,avatar, password} = req.body;
    // check if the email exists
    const userExists= await db.User.findOne({where:{email}});
    if(userExists) {
        return res.status(400).send('Email is already associated with an account');
    }
    db.User.create({
            firstName,
            lastName,
            user,
            email,
            phone,
            dateofbirth,
            avatar,
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